import {Component, Input, OnInit} from '@angular/core';
import {SpellEffect} from '../../../../../../schemas/homebrew/SpellEffects';

@Component({
  selector: 'avr-new-effect-card',
  template: `
    <mat-card fxLayout="row" fxLayoutAlign="start center" class="new-effect-card">
      <span class="no-text-cursor">Add {{parentType == 'meta' ? "Meta" : "Effect"}}</span>
      <span class="toolbar-spacer"></span>
      <span>
        <button mat-icon-button (click)="newEffect()">
          <mat-icon aria-label="New">add</mat-icon>
        </button>
      </span>
    </mat-card>
  `,
  styleUrls: ['./new-effect-card.component.css']
})
export class NewEffectCardComponent implements OnInit {

  @Input() parent: Array<SpellEffect>;
  @Input() parentType: string;

  constructor() {
  }

  ngOnInit() {
  }

  newEffect() {

  }

}
