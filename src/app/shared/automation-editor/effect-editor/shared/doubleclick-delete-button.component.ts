import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'avr-doubleclick-delete-button',
    template: `
    <button mat-icon-button
            [color]="deleteState === 0 ? 'warn' : 'accent'"
            matTooltip="Double click to delete."
            (click)="deleteClicked()"
            (clickOutside)="deleteState = 0">
      <mat-icon aria-label="Delete">delete</mat-icon>
    </button>
  `,
    // legacy delete button: 40px, icon centered, click ripple only (no hover layer)
    styles: [`
      :host .mat-mdc-icon-button {
        width: 40px;
        height: 40px;
        padding: 8px;
        --mdc-icon-button-state-layer-size: 40px;
        --mat-icon-button-hover-state-layer-opacity: 0;
        --mat-icon-button-focus-state-layer-opacity: 0;
      }
    `],
    standalone: false
})
export class DoubleClickDeleteButtonComponent {

  @Output() delete = new EventEmitter();
  deleteState = 0;  // tracks 2-click on the delete button

  constructor() {
  }

  deleteClicked() {
    this.deleteState++;
    if (this.deleteState === 2) {  // only delete on the 2nd click
      this.delete.emit();
      this.deleteState = 0;
    }
  }
}
