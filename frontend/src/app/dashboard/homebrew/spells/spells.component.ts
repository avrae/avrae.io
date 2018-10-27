import {Component, OnInit} from '@angular/core';
import {HomebrewService} from "../homebrew.service";
import {MatDialog} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {Tome} from "../../../schemas/homebrew/Spells";
import {NewTomeDialog} from "./new-tome-dialog/new-tome-dialog.component";
import {TomeShareDialog} from "./tome-share-dialog/tome-share-dialog.component";

@Component({
  selector: 'avr-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.css']
})
export class SpellsComponent implements OnInit {

  tomes: Tome[];

  constructor(private homebrewService: HomebrewService, private dialog: MatDialog, private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getTomes();
  }

  getTomes(): void {
    this.homebrewService.getUserTomes()
      .subscribe(tomes => this.tomes = tomes);
  }

  beginNew() {
    const dialogRef = this.dialog.open(NewTomeDialog, {
      width: "60%",
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let data = {name: result.name, public: result.public, desc: result.desc, image: result.image};
        this.new(data);
      }
    });
  }

  beginShare(tome: Tome) {
    const dialogRef = this.dialog.open(TomeShareDialog, {
      data: tome,
      width: "40%",
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        tome = Object.assign(tome, result);
        this.commit(tome);
      }
    });
  }

  new(tome: { name: string, public: boolean, desc: string, image: string }) {
    // HTTP POST /homebrew/spells
    this.homebrewService.newTome(tome)
      .subscribe(result => {
        if (result.success) {
          this.router.navigate([result.tomeId], {relativeTo: this.route});
        }
      });
  }

  commit(tome: Tome) {
    // HTTP PUT /homebrew/spells/:tome
    this.homebrewService.putTome(tome)
      .subscribe(result => {
        console.log(result);
      });
  }

}
