import {Component, OnInit} from '@angular/core';
import {Pack} from '../../../schemas/homebrew/item.model';
import {HomebrewService} from '../homebrew.service';
import {MatDialog} from '@angular/material';
import {NewPackDialog} from './new-pack-dialog/new-pack-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {PackShareDialog} from './pack-share-dialog/pack-share-dialog.component';

@Component({
  selector: 'avr-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  packs: Pack[];

  constructor(private homebrewService: HomebrewService, private dialog: MatDialog, private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getPacks();
  }

  getPacks(): void {
    this.homebrewService.getUserPacks()
      .subscribe(packs => this.packs = packs);
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
