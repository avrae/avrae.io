import {Component, Input, OnInit} from '@angular/core';
import {WorkshopAliasFull, WorkshopBindings, WorkshopCollectable, WorkshopEntitlement, WorkshopSnippet} from '../../../schemas/Workshop';
import {debrace} from '../../../shared/DisplayUtils';
import {WorkshopService} from '../workshop.service';

@Component({
  selector: 'avr-collectable-display',
  templateUrl: './collectable-display.component.html',
  styleUrls: ['./collectable-display.component.scss']
})
export class CollectableDisplayComponent implements OnInit {
  // exports
  debrace = debrace;

  @Input() alias: WorkshopAliasFull;  // alias and snippet are mutually exclusive
  @Input() snippet: WorkshopSnippet;
  @Input() parentComponent: CollectableDisplayComponent;
  @Input() bindings: WorkshopBindings;
  isOpen = false;
  entitlementsIsOpen = false;


  constructor(public workshopService: WorkshopService) {
  }

  ngOnInit(): void {
  }

  get collectable(): WorkshopCollectable {
    return this.alias || this.snippet;
  }

  // event listeners
  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  toggleEntitlementsOpen() {
    this.entitlementsIsOpen = !this.entitlementsIsOpen;
  }

  // helpers
  getBoundName() {
    const bindings = this.alias ? this.bindings?.alias_bindings : this.bindings?.snippet_bindings;
    if (this.bindings && bindings.some(b => b.id === this.collectable._id)) {
      return bindings.find(b => b.id === this.collectable._id).name;
    } else {
      return this.collectable.name;
    }
  }

  hasCustomBindings() {
    return this.getBoundName() !== this.collectable.name;
  }

  getSignature() {
    const boundName = this.getBoundName();
    if (this.alias) {
      if (this.parentComponent) {
        return `${this.parentComponent.getSignature()} ${boundName}`;
      }
      return `!${boundName}`;
    } else {
      return boundName;
    }
  }

  getUnboundSignature() {
    if (this.alias) {
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

  canOpen(): any {
    return (this.getShortDocs() !== this.collectable.docs)
      || this.collectable.entitlements.length;
  }

  getEntity(entitlement: WorkshopEntitlement) {
    return this.workshopService.entityFromEntitlement(entitlement.entity_type, entitlement.entity_id);
  }
}
