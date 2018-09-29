import {Component, OnInit} from '@angular/core';
import {Item, Pack} from "../../schemas/homebrew/Items";
import {ActivatedRoute} from "@angular/router";
import {HomebrewSharingService} from "../homebrew-sharing.service";
import {Meta} from "@angular/platform-browser";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'avr-pack-share',
  templateUrl: './pack-share.component.html',
  styleUrls: ['./pack-share.component.css']
})
export class PackShareComponent implements OnInit {

  pack: Pack;
  selectedItem: Item;

  constructor(private route: ActivatedRoute, private homebrewService: HomebrewSharingService, private meta: Meta) {
  }

  ngOnInit() {
    this.getPack();
  }

  updateMeta() {
    this.meta.updateTag(
      {
        name: "description",
        content: `${this.pack.desc}\nView ${this.pack.name} on Avrae Homebrew.`.trim()
      });
    this.meta.updateTag(
      {property: "og:title", content: this.pack.name}
    );
    this.meta.updateTag(
      {property: "og:url", content: `${environment.baseURL}/${this.route.snapshot.url.join('/')}`}
    );
    this.meta.updateTag(
      {property: "og:image", content: this.pack.image}
    );
    this.meta.updateTag(
      {
        property: "og:description",
        content: `${this.pack.desc}\nView ${this.pack.name} on Avrae Homebrew.`.trim()
      });
  }

  getPack() {
    const id = this.route.snapshot.paramMap.get('pack');
    this.homebrewService.getPack(id)
      .subscribe(pack => {
        this.pack = pack;
        this.updateMeta()
      });
  }
}
