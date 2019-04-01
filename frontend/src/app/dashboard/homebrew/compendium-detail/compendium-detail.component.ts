/**
 * The main container for a compendium toolbar, as well as save bar. Also handles all the meta dialogs.
 */

import {Location} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {Compendium} from '../../../schemas/homebrew/compendium.model';
import {UserInfo} from '../../../schemas/UserInfo';
import {getUser} from '../../APIHelper';
import {DashboardService} from '../../dashboard.service';
import {HomebrewService} from '../homebrew.service';

@Component({
  selector: 'avr-compendium-detail',
  templateUrl: './compendium-detail.component.html',
  styleUrls: ['./compendium-detail.component.css']
})
export class CompendiumDetailComponent implements OnInit, OnDestroy {

  compendium: Compendium;
  user: UserInfo = getUser();
  canEdit: boolean;
  isOwner: boolean;
  changesOpen = false;

  constructor(private route: ActivatedRoute, private homebrewService: HomebrewService,
              private dashboardService: DashboardService, private location: Location, private dialog: MatDialog,
              private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getUser();
    this.getCompendium();
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

  getCompendium() {
    const id = this.route.snapshot.paramMap.get('compendium');
    this.homebrewService.getCompendium(id)
      .subscribe(tome => {
        this.compendium = tome;
        this.calcCanEdit();
      });
  }

  calcCanEdit() {
    if (!this.compendium || !this.user) {
      return;
    }
    this.isOwner = this.user.id === this.compendium.owner.id;
    this.canEdit = this.isOwner || this.compendium.editors.some(e => e.id === this.user.id);
  }

  ensureChangesNotif() {
    if (!this.changesOpen) {
      this.changesOpen = true;
      let snackBarRef = this.snackBar.open('You have unsaved changes!', 'Save', {duration: -1});

      snackBarRef.onAction().subscribe(() => {
        this.commit();
      });
    }
  }

  beginShare() { // TODO
    // const dialogRef = this.dialog.open(TomeShareDialog, {
    //   data: this.compendium,
    //   width: '40%',
    //   disableClose: true
    // });
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     console.log(result);
    //     this.compendium = Object.assign(this.compendium, result);
    //     this.commit();
    //   }
    // });
  }

  beginSettings() { // TODO
    // const dialogRef = this.dialog.open(TomeOptionsDialog, {
    //   data: this.compendium,
    //   width: '40%',
    //   disableClose: true
    // });
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     console.log(result);
    //     if (result.delete) {
    //       this.delete();
    //     } else {
    //       this.compendium = Object.assign(this.compendium, result);
    //       this.commit();
    //     }
    //   }
    // });
  }

  commit() { // TODO
    // HTTP PUT /homebrew/:compendium
    // this.homebrewService.putTome(this.compendium)
    //   .subscribe(result => {
    //     console.log(result);
    //     this.changesOpen = false;
    //     this.snackBar.open(result);
    //   });
  }

  delete() { // TODO
    // HTTP DELETE /homebrew/:compendium
    // this.homebrewService.deleteTome(this.compendium)
    //   .subscribe(result => {
    //     console.log(result);
    //     this.router.navigate(['../'], {relativeTo: this.route});
    //   });
  }

  back() {
    this.location.back();
  }

}
