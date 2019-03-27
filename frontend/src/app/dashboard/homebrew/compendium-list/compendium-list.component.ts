import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {Compendium} from '../../../schemas/homebrew/compendium.model';
import {NewCompendiumDialog} from '../dialogs/new-compendium-dialog.component';
import {HomebrewService} from '../homebrew.service';

@Component({
  selector: 'avr-compendium-list',
  templateUrl: './compendium-list.component.html',
  styleUrls: ['./compendium-list.component.css']
})
export class CompendiumListComponent implements OnInit {

  compendiums: Compendium[];
  numCols: number;

  constructor(private homebrewService: HomebrewService, private dialog: MatDialog, private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getCompendiums();

    if (window.innerWidth <= 960) {
      this.numCols = 1;
    } else if (window.innerWidth <= 1600) {
      this.numCols = 4;
    } else {
      this.numCols = 6;
    }
  }

  getCompendiums(): void {
    this.homebrewService.getUserCompendiums()
      .subscribe(compendiums => this.compendiums = compendiums);
  }

  // Dialogs
  beginNew() {
    const dialogRef = this.dialog.open(NewCompendiumDialog, {
      width: '60%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const data = {name: result.name, public: result.public, desc: result.desc, image: result.image};
        this.new(data);
      }
    });
  }

  // HTTP
  new(compendium: { name: string, public: boolean, desc: string, image: string }) {
    // HTTP POST /homebrew
    this.homebrewService.newCompendium(compendium)
      .subscribe(result => {
        if (result.success) {
          this.router.navigate([result.compendiumId], {relativeTo: this.route});
        }
      });
  }

  // Responsiveness
  onResize(event) {
    if (event.target.innerWidth <= 960) {
      this.numCols = 1;
    } else if (event.target.innerWidth <= 1600) {
      this.numCols = 4;
    } else {
      this.numCols = 6;
    }
  }
}
