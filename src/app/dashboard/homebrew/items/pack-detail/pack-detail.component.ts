import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Item, Pack} from '../../../../schemas/homebrew/Items';
import {HomebrewService} from '../../homebrew.service';
import {Location} from '@angular/common';
import {UserInfo} from '../../../../schemas/UserInfo';
import {DashboardService} from '../../../dashboard.service';
import {PackShareDialog} from '../pack-share-dialog/pack-share-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PackOptionsDialog} from '../pack-options-dialog/pack-options-dialog.component';
import {getUser} from '../../../APIHelper';
import {PackJSONImportDialog} from '../pack-json-import-dialog/pack-json-import-dialog.component';
import {PackSRDImportDialog} from '../pack-srd-import-dialog/pack-srd-import-dialog.component';

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
  changesOpen: boolean = false;
  selectedItem: Item;

  constructor(private route: ActivatedRoute, private homebrewService: HomebrewService,
              private dashboardService: DashboardService, private location: Location, private dialog: MatDialog,
              private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getUser();
    this.getPack();
  }

  ngOnDestroy() {
    this.snackBar.dismiss();
  }

  getUser() {
    if (!this.user) {
      this.dashboardService.getUserInfo()
        .subscribe(user => {
          this.user = user;
          this.calcCanEdit();
        });
    }
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
    this.isOwner = this.user.id === this.pack.owner.id;
    this.canEdit = this.isOwner || this.pack.editors.some(e => e.id === this.user.id);
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
    const dialogRef = this.dialog.open(PackJSONImportDialog, {
      width: '60%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let item: Item | Item[] = result;
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

  beginNewFromSRD() {
    const dialogRef = this.dialog.open(PackSRDImportDialog, {
      width: '60%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.pack.items.push(result);
        this.ensureChangesNotif();
      }
    });
  }

  commit() {
    // HTTP PUT /homebrew/items/:pack
    this.homebrewService.putPack(this.pack)
      .subscribe(result => {
        console.log(result);
        this.changesOpen = false;
        this.snackBar.open(result, null, {horizontalPosition: 'right'});
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
}
