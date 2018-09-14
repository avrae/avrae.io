import {Component, OnInit} from '@angular/core';
import {Pack} from "../../../schemas/homebrew/Items";
import {HomebrewService} from "../homebrew.service";

@Component({
  selector: 'avr-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  packs: Pack[];

  constructor(private homebrewService: HomebrewService) {
  }

  ngOnInit() {
    this.getPacks();
  }

  getPacks(): void {
    this.homebrewService.getUserPacks()
      .subscribe(packs => this.packs = packs);
  }

}
