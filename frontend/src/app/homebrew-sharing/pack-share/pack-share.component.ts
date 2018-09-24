import {Component, OnInit} from '@angular/core';
import {Item, Pack} from "../../schemas/homebrew/Items";
import {ActivatedRoute} from "@angular/router";
import {HomebrewSharingService} from "../homebrew-sharing.service";

@Component({
  selector: 'avr-pack-share',
  templateUrl: './pack-share.component.html',
  styleUrls: ['./pack-share.component.css']
})
export class PackShareComponent implements OnInit {

  pack: Pack;
  selectedItem: Item;

  constructor(private route: ActivatedRoute, private homebrewService: HomebrewSharingService) {
  }

  ngOnInit() {
    this.getPack();
  }

  getPack() {
    const id = this.route.snapshot.paramMap.get('pack');
    this.homebrewService.getPack(id)
      .subscribe(pack => {
        this.pack = pack;
      });
  }
}
