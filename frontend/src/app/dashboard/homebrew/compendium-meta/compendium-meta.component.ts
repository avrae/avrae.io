import {Component, Input, OnInit} from '@angular/core';
import {Compendium} from '../../../schemas/homebrew/compendium.model';

@Component({
  selector: 'avr-compendium-meta',
  templateUrl: './compendium-meta.component.html',
  styleUrls: ['./compendium-meta.component.css']
})
export class CompendiumMetaComponent implements OnInit {

  @Input() compendium: Compendium;
  numCols: number;

  constructor() {
  }

  ngOnInit() {

    if (window.innerWidth <= 960) {
      this.numCols = 1;
    } else {
      this.numCols = 2;
    }
  }

  // Responsiveness
  onResize(event) {
    if (event.target.innerWidth <= 960) {
      this.numCols = 1;
    } else {
      this.numCols = 2;
    }
  }

}
