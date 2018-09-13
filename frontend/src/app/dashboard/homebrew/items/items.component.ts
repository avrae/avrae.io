import {Component, OnInit} from '@angular/core';
import {Pack} from "../../../schemas/homebrew/Items";

@Component({
  selector: 'avr-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  packs: Pack[] = [new Pack(), new Pack(), new Pack(), new Pack(), new Pack()];

  constructor() {
  }

  ngOnInit() {
  }

}
