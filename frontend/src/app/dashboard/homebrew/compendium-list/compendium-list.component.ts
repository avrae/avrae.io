import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {Compendium} from '../../../schemas/homebrew/compendium.model';
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

  getCompendiums(): void { // TODO
    // this.homebrewService.getUserPacks()
    //   .subscribe(compendiums => this.compendiums = compendiums);
    this.compendiums = [
      {
        // metadata
        name: 'The Book of Hordes',
        owner: {
          id: '187421759484592128',
          username: 'zhu.exe',
          avatarUrl: ''
        },
        editors: [],
        subscribers: [],
        public: true,
        active: [],
        server_active: [],
        desc: 'this is a test compendium, also by silver',
        image: 'https://cdn.discordapp.com/attachments/269276476023635978/559876133919653917/EDsYH0W.png',

        // MongoDB id
        _id: {'$oid': 'potato'},

      } as Compendium,
      {
        name: 'ATLAS',
        owner: {
          id: '187421759484592128',
          username: 'zhu.exe',
          avatarUrl: ''
        },
        editors: [],
        subscribers: [],
        public: true,
        active: [],
        server_active: [],
        desc: 'All the Lights in the Sky Are Stars, a compendium by silver',
        image: 'https://media.discordapp.net/attachments/363397989902974986/524795883057840128/TXLKZew.png',
        _id: {'$oid': 'tomato'},

      } as Compendium,
      {
        name: 'Test',
        owner: {
          id: '187421759484592128',
          username: 'zhu.exe',
          avatarUrl: ''
        },
        editors: [],
        subscribers: [],
        public: true,
        active: [],
        server_active: [],
        desc: 'an empty compendium; I scream aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ',
        image: '',
        _id: {'$oid': 'foo'},

      } as Compendium,
    ]; // TODO remove sample data
  }

  beginNew() {
    // TODO
  }

  beginShare() {
    // TODO
  }

  new() {
    // TODO
  }

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
