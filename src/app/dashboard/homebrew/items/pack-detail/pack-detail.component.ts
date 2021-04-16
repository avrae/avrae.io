import {moveItemInArray} from '@angular/cdk/drag-drop';
import {Location} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {Item, Pack, REQUIRED_ITEM_PROPS} from '../../../../schemas/homebrew/Items';
import {UserInfo} from '../../../../schemas/UserInfo';
import {JSONImportDialog} from '../../../../shared/dialogs/json-import-dialog/json-import-dialog.component';
import {SRDCopyDialog} from '../../../../shared/dialogs/srd-copy-dialog/srd-copy-dialog.component';
import {getUser} from '../../../APIHelper';
import {DashboardService} from '../../../dashboard.service';
import {HomebrewService} from '../../homebrew.service';
import {PackOptionsDialog} from '../pack-options-dialog/pack-options-dialog.component';
import {PackShareDialog} from '../pack-share-dialog/pack-share-dialog.component';

@Component({
  selector: 'avr-pack-detail',
  templateUrl: './pack-detail.component.html',
  styleUrls: ['./pack-detail.component.scss']
})
export class PackDetailComponent implements OnInit, OnDestroy {

  pack: Pack;
  user: UserInfo = getUser();
  canEdit: boolean;
  isOwner: boolean;
  changesOpen = false;
  selectedItem: Item;

  constructor(private route: ActivatedRoute, private homebrewService: HomebrewService,
              private dashboardService: DashboardService, private location: Location, private dialog: MatDialog,
              private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getPack();
  }

  ngOnDestroy() {
    this.snackBar.dismiss();
  }

  getPack() {
    const id = this.route.snapshot.paramMap.get('pack');
    this.homebrewService.getPack(id)
      .subscribe(pack => {
        this.pack = pack;
        this.calcCanEdit();
      });
  }

  calcCanEdit() {
    if (!this.pack || !this.user) {
      return;
    }
    this.isOwner = this.user.id === this.pack.owner;
    if (this.isOwner) {
      this.canEdit = true;
    } else {
      const id = this.pack._id.$oid;
      this.homebrewService.getPackEditors(id)
        .subscribe(editors => this.canEdit = editors.some(e => e === this.user.id));
    }
  }

  newLooseItem() {
    this.pack.items.push(new Item());
    this.ensureChangesNotif();
  }

  deleteItem(item: Item) {
    this.pack.items = this.pack.items.filter(obj => obj !== item);
    this.ensureChangesNotif();
  }

  ensureChangesNotif() {
    if (!this.changesOpen) {
      this.changesOpen = true;
      let snackBarRef = this.snackBar.open('You have unsaved changes!', 'Save', {duration: -1, horizontalPosition: 'right'});

      snackBarRef.onAction().subscribe(() => {
        this.commit();
      });
    }
  }

  beginShare() {
    const dialogRef = this.dialog.open(PackShareDialog, {
      data: this.pack,
      width: '40%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.pack = Object.assign(this.pack, result);
        this.commit();
      }
    });
  }

  beginSettings() {
    const dialogRef = this.dialog.open(PackOptionsDialog, {
      data: this.pack,
      width: '40%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        if (result.delete) {
          this.delete();
        } else {
          this.pack = Object.assign(this.pack, result);
          this.commit();
        }
      }
    });
  }

  beginNewFromJSON() {
    const dialogRef = this.dialog.open(JSONImportDialog, {
      width: '60%',
      disableClose: true,
      data: {validator: (data) => this.validatePackJSON(dialogRef, data)}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const item: Item | Item[] = result;
        console.log(item);
        if (item instanceof Array) {
          this.pack.items.push(...item);
        } else {
          this.pack.items.push(item);
        }
        this.ensureChangesNotif();
      }
    });
  }

  // SRD import
  beginNewFromSRD() {
    const dialogRef = this.dialog.open(SRDCopyDialog, {
      width: '60%',
      disableClose: true,
      data: {getter: () => this.homebrewService.getTemplateItems(), namer: a => a.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pack.items.push(result);
        this.ensureChangesNotif();
      }
    });
  }

  // validation
  packIsValid(parsed) {
    if (parsed instanceof Array) {
      return Boolean(parsed.length) && parsed.every(item => this.objectIsItem(item));
    } else if (parsed) {
      return this.objectIsItem(parsed);
    }
    return false;
  }

  validatePackJSON(dialogRef, parsed) {
    dialogRef.componentInstance.loading = false;
    if (this.packIsValid(parsed)) {
      dialogRef.close(JSON.parse(dialogRef.componentInstance.data));
    } else {
      dialogRef.componentInstance.error = 'Invalid pack data';
    }
  }

  objectIsItem(obj: any): obj is Item {
    return REQUIRED_ITEM_PROPS.every(v => v in obj);
  }

  commit() {
    // HTTP PUT /homebrew/items/:pack
    this.homebrewService.putPack(this.pack)
      .subscribe(result => {
        this.changesOpen = false;
        if (result.success) {
          this.snackBar.open(`${result.data} Use "!pack ${this.pack.name}" to activate the pack in Discord!`, null, {horizontalPosition: 'right'});
        } else {
          this.snackBar.open(`Error: ${result.error}`, 'Close', {
            horizontalPosition: 'right',
            duration: -1,
            panelClass: 'preserve-whitespace'
          });
        }
      });
  }

  delete() {
    // HTTP DELETE /homebrew/items/:pack
    this.homebrewService.deletePack(this.pack)
      .subscribe(result => {
        console.log(result);
        this.router.navigate(['../'], {relativeTo: this.route});
      });
  }

  back() {
    this.location.back();
  }

  // move items in list
  moveUp(item: Item) {
    const index = this.pack.items.indexOf(item);
    const newIndex = index - 1;
    if (newIndex > -1) {
      moveItemInArray(this.pack.items, index, newIndex);
      this.ensureChangesNotif();
    }
  }

  moveDown(item: Item) {
    const index = this.pack.items.indexOf(item);
    const newIndex = index + 1;
    if (newIndex < this.pack.items.length) {
      moveItemInArray(this.pack.items, index, newIndex);
      this.ensureChangesNotif();
    }
  }
}
