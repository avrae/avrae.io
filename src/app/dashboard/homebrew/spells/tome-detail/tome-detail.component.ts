import {Location} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';

import {Spell, Tome} from '../../../../schemas/homebrew/Spells';
import {UserInfo} from '../../../../schemas/UserInfo';
import {getUser} from '../../../APIHelper';
import {DashboardService} from '../../../dashboard.service';
import {HomebrewService} from '../../homebrew.service';
import {TomeOptionsDialog} from '../dialogs/tome-options-dialog.component';
import {TomeShareDialog} from '../dialogs/tome-share-dialog.component';
import {ValidationSnackbar} from '../../../../shared/validation-snackbar/validation-snackbar.component';


@Component({
  selector: 'avr-tome-detail',
  templateUrl: './tome-detail.component.html',
  styleUrls: ['./tome-detail.component.scss']
})
export class TomeDetailComponent implements OnInit, OnDestroy {

  tome: Tome;
  user: UserInfo = getUser();
  canEdit: boolean;
  isOwner: boolean;
  changesOpen = false;
  selectedSpell: Spell;
  error: string;

  constructor(private route: ActivatedRoute, private homebrewService: HomebrewService,
              private dashboardService: DashboardService, private location: Location, private dialog: MatDialog,
              private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getTome();
  }

  ngOnDestroy() {
    this.snackBar.dismiss();
  }

  getTome() {
    const id = this.route.snapshot.paramMap.get('tome');
    this.homebrewService.getTome(id)
      .subscribe(response => {
        if (response.success) {
          this.tome = response.data;
          this.calcCanEdit();
        } else {
          this.error = response.error;
        }
      });
  }

  calcCanEdit() {
    if (!this.tome || !this.user) {
      return;
    }
    this.isOwner = this.user.id === this.tome.owner;
    if (this.isOwner) {
      this.canEdit = true;
    } else {
      const id = this.tome._id;
      this.homebrewService.getTomeEditors(id)
        .subscribe(response => this.canEdit = response.data.some(e => e === this.user.id));
    }
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
    const dialogRef = this.dialog.open(TomeShareDialog, {
      data: this.tome,
      width: '40%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.tome = Object.assign(this.tome, result);
        this.commit();
      }
    });
  }

  beginSettings() {
    const dialogRef = this.dialog.open(TomeOptionsDialog, {
      data: this.tome,
      width: '40%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        if (result.delete) {
          this.delete();
        } else {
          this.tome = Object.assign(this.tome, result);
          this.commit();
        }
      }
    });
  }

  commit() {
    // HTTP PUT /homebrew/spells/:tome
    this.homebrewService.putTome(this.tome)
      .subscribe(result => {
        this.changesOpen = false;
        if (result.success) {
          this.snackBar.open(`${result.data} Use "!tome ${this.tome.name}" to activate the pack in Discord!`, null, {horizontalPosition: 'right'});
        } else {
          this.snackBar.openFromComponent(ValidationSnackbar, {
            data: {
              html: `${result.error}`
            },
            horizontalPosition: 'right',
            duration: -1
          });  
        }
      });
  }

  delete() {
    // HTTP DELETE /homebrew/spells/:tome
    this.homebrewService.deleteTome(this.tome)
      .subscribe(result => {
        if (!result.success) {
          this.snackBar.openFromComponent(ValidationSnackbar, {
            data: {
              html: `${result.error}`
            },
            horizontalPosition: 'right',
            duration: -1,
            panelClass: ['mat-simple-snackbar']
          }
          );
        } else {
          this.router.navigate(['../'], {relativeTo: this.route});
        }
      });
  }

  back() {
    this.location.back();
  }
}

