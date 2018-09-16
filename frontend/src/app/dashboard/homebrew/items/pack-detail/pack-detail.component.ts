import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Pack} from "../../../../schemas/homebrew/Items";
import {HomebrewService} from "../../homebrew.service";
import {Location} from "@angular/common";
import {UserInfo} from "../../../../schemas/UserInfo";
import {DashboardService} from "../../../dashboard.service";
import {PackShareDialog} from "../pack-share-dialog/pack-share-dialog.component";
import {MatDialog} from "@angular/material";
import {PackOptionsDialog} from "../pack-options-dialog/pack-options-dialog.component";
import {getUser} from "../../../APIHelper";

@Component({
  selector: 'avr-pack-detail',
  templateUrl: './pack-detail.component.html',
  styleUrls: ['./pack-detail.component.css']
})
export class PackDetailComponent implements OnInit {

  pack: Pack;
  user: UserInfo = getUser();
  canEdit: boolean;
  isOwner: boolean;

  constructor(private route: ActivatedRoute, private homebrewService: HomebrewService,
              private dashboardService: DashboardService, private location: Location, private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.getUser();
    this.getPack();
  }

  getUser() {
    this.dashboardService.getUserInfo()
      .subscribe(user => {
        this.user = user;
        this.calcCanEdit();
      })
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
      return
    }
    this.isOwner = this.user.id == this.pack.owner.id;
    this.canEdit = this.isOwner || this.pack.editors.some(e => e.id == this.user.id);
  }

  beginShare() {
    const dialogRef = this.dialog.open(PackShareDialog, {
      data: this.pack,
      width: "40%",
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
      width: "40%",
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

  commit() {
    // HTTP PUT /homebrew/items/:pack
    this.homebrewService.putPack(this.pack)
      .subscribe(result => {
        console.log(result);
      });
  }

  delete() {
    // HTTP DELETE /homebrew/items/:pack
    this.homebrewService.deletePack(this.pack)
      .subscribe(result => {
        console.log(result);
        this.router.navigate(["../"], {relativeTo: this.route})
      });
  }

  back() {
    this.location.back()
  }
}
