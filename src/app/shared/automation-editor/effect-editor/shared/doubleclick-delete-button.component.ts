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
  styles: []
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
