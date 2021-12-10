import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {of} from 'rxjs';
import {DiscordUser} from '../../../schemas/Discord';
import {Tome} from '../../../schemas/homebrew/Spells';
import {UserInfo} from '../../../schemas/UserInfo';
import {DiscordService} from '../../../shared/discord.service';
import {HomebrewService} from '../homebrew.service';
import {NewTomeDialog} from './dialogs/new-tome-dialog.component';
import {TomeShareDialog} from './dialogs/tome-share-dialog.component';

@Component({
  selector: 'avr-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.css']
})
export class SpellsComponent implements OnInit {

  tomes: Tome[];
  owners: Map<string, DiscordUser> = new Map<string, DiscordUser>();

  constructor(private homebrewService: HomebrewService, private discord: DiscordService,
              private dialog: MatDialog, private router: Router, private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getTomes();
  }

  getTomes(): void {
    this.homebrewService.getUserTomes()
      .subscribe(response => {
        console.log(response);
        if (!response.success) {
          return;
        }
        this.tomes = response.data;
        const requested = new Set();
        for (const tome of response.data) {
          if (!requested.has(tome.owner)) {
            requested.add(tome.owner);
            this.discord.getUser(tome.owner)
              .subscribe(user => this.owners.set(tome.owner, user));
          }
        }
      });
  }

  beginNew() {
    const dialogRef = this.dialog.open(NewTomeDialog, {
      width: '60%',
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
      width: '40%',
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
          this.router.navigate([result.data.tomeId], {relativeTo: this.route});
        }
      });
  }

  commit(tome: Tome) {
    // HTTP PUT /homebrew/spells/:tome
    this.homebrewService.updateTomeSharing(tome._id, tome.public)
      .subscribe(result => {
        if (result.success) {
          this.snackBar.open('Tome sharing options updated.', null, {horizontalPosition: 'right'});
        } else {
          console.log(result);
          this.snackBar.open(`Error: ${result.error}`, 'Close', {
            horizontalPosition: 'right',
            duration: -1,
            panelClass: 'preserve-whitespace'
          });
        }
      });
  }

}
