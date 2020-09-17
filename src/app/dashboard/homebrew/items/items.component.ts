import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {DiscordUser} from '../../../schemas/Discord';
import {Pack} from '../../../schemas/homebrew/Items';
import {DiscordService} from '../../../shared/discord.service';
import {HomebrewService} from '../homebrew.service';
import {NewPackDialog} from './new-pack-dialog/new-pack-dialog.component';
import {PackShareDialog} from './pack-share-dialog/pack-share-dialog.component';

@Component({
  selector: 'avr-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  packs: Pack[];
  owners: Map<string, DiscordUser> = new Map<string, DiscordUser>();

  constructor(private homebrewService: HomebrewService, private discord: DiscordService,
              private dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getPacks();
  }

  getPacks(): void {
    this.homebrewService.getUserPacks()
      .subscribe(packs => {
        this.packs = packs;
        const requested = new Set();
        for (const pack of packs) {
          if (!requested.has(pack.owner)) {
            requested.add(pack.owner);
            this.discord.getUser(pack.owner)
              .subscribe(user => this.owners.set(pack.owner, user));
          }
        }
      });
  }

  beginNew() {
    const dialogRef = this.dialog.open(NewPackDialog, {
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

  beginShare(pack: Pack) {
    const dialogRef = this.dialog.open(PackShareDialog, {
      data: pack,
      width: '40%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        pack = Object.assign(pack, result);
        this.commit(pack);
      }
    });
  }

  new(pack: { name: string, public: boolean, desc: string, image: string }) {
    // HTTP POST /homebrew/items
    this.homebrewService.newPack(pack)
      .subscribe(result => {
        if (result.success) {
          this.router.navigate([result.packId], {relativeTo: this.route});
        }
      });
  }

  commit(pack: Pack) {
    // HTTP PUT /homebrew/items/:pack
    this.homebrewService.putPack(pack)
      .subscribe(result => {
        console.log(result);
      });
  }

}
