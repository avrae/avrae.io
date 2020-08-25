import {Component, Input, OnInit} from '@angular/core';
import {WorkshopAlias, WorkshopBindings, WorkshopSnippet} from '../../../../schemas/Workshop';
import {debrace} from '../../../../shared/DisplayUtils';

@Component({
  selector: 'avr-collectable-display',
  templateUrl: './collectable-display.component.html',
  styleUrls: ['./collectable-display.component.scss']
})
export class CollectableDisplayComponent implements OnInit {
  // exports
  debrace = debrace;

  @Input() collectable: WorkshopAlias | WorkshopSnippet;
  @Input() isAlias: boolean;
  @Input() parentComponent: CollectableDisplayComponent;
  @Input() bindings: WorkshopBindings;
  isOpen = false;


  constructor() {
  }

  ngOnInit(): void {
  }

  // event listeners
  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  // helpers
  getSignature() {
    if (this.isAlias) {
      if (this.parentComponent) {
        return `${this.parentComponent.getSignature()} ${this.collectable.name}`;
      }
      return `!${this.collectable.name}`;
    } else {
      return this.collectable.name;
    }
  }

  getShortDocs() {
    return this.collectable.docs.split('\n')[0];
  }

  canOpen() {
    return this.getShortDocs() !== this.collectable.docs;
  }
}
