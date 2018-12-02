import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Attack} from '../../../../../../../schemas/homebrew/SpellEffects';

@Component({
  selector: 'avr-attack-effect',
  template: `
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title>
          On Hit
        </mat-panel-title>
      </mat-expansion-panel-header>
      <avr-effect-editor [parent]="effect.hit" (changed)="changed.emit()"></avr-effect-editor>
      <avr-new-effect-card [metaParent]="effect.meta" [parent]="effect.hit"
                           [parentType]="effect.type" (changed)="changed.emit()"></avr-new-effect-card>
    </mat-expansion-panel>
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title>
          On Miss
        </mat-panel-title>
      </mat-expansion-panel-header>
      <avr-effect-editor [parent]="effect.miss" (changed)="changed.emit()"></avr-effect-editor>
      <avr-new-effect-card [metaParent]="effect.meta" [parent]="effect.miss"
                           [parentType]="effect.type" (changed)="changed.emit()"></avr-new-effect-card>
    </mat-expansion-panel>
  `,
  styleUrls: ['../effect-editor.component.css']
})
export class AttackEffectComponent implements OnInit {

  @Input() effect: Attack;
  @Output() changed = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
