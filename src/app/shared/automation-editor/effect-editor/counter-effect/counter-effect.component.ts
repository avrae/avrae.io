import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SpellSlotReference, UseCounter} from '../../../../schemas/homebrew/AutomationEffects';
import {Spell} from '../../../../schemas/homebrew/Spells';

@Component({
  selector: 'avr-counter-effect',
  template: `
    <div>
      <span>Use a </span>

      <mat-form-field>
        <mat-label>Counter Type</mat-label>
        <mat-select [(value)]="counterType" (selectionChange)="changed.emit(); onCounterTypeChange()">
          <mat-option value="counter">custom counter</mat-option>
          <mat-option value="slot">spell slot</mat-option>
        </mat-select>
      </mat-form-field>

      <span [ngSwitch]="counterType">
        <span *ngSwitchDefault>
          <span> named </span>
          <mat-form-field>
            <input matInput placeholder="Counter Name" (change)="changed.emit()" [(ngModel)]="effect.counter">
          </mat-form-field>
        </span>

        <span *ngSwitchCase="'slot'">
          <span> of level </span>
          <mat-form-field>
            <input matInput placeholder="Slot Level" type="number" max="9" min="1" (change)="changed.emit()"
                   [(ngModel)]="effect.counter.slot">
          </mat-form-field>
        </span>
      </span>
    </div>

    <div>
      <mat-form-field>
        <input matInput placeholder="Amount" (change)="changed.emit()" [(ngModel)]="effect.amount">
        <mat-icon matSuffix matTooltip="IntExpression - variables and functions allowed, braces optional">calculate</mat-icon>
      </mat-form-field>

      <mat-checkbox [(ngModel)]="effect.allowOverflow" (change)="changed.emit()" style="margin-left: 4px;">
        Allow Overflow
      </mat-checkbox>
    </div>

    <mat-form-field>
      <mat-label>Error Behaviour</mat-label>
      <mat-select [(value)]="effect.errorBehaviour" (selectionChange)="changed.emit()">
        <mat-option [value]="null">Ignore</mat-option>
        <mat-option value="warn">Show Warning</mat-option>
        <mat-option value="raise">Stop Execution</mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styleUrls: ['../effect-editor.component.css']
})
export class CounterEffectComponent implements OnInit {

  @Input() effect: UseCounter;
  @Input() spell: Spell;
  @Output() changed = new EventEmitter();
  counterType: 'counter' | 'slot';

  constructor() {
  }

  ngOnInit(): void {
    if (typeof this.effect.counter === 'string') {
      this.counterType = 'counter';
    } else if ('slot' in this.effect.counter) {
      this.counterType = 'slot';
    }
  }

  onCounterTypeChange(): void {
    if (this.counterType === 'counter') {
      this.effect.counter = '';
    } else if (this.counterType === 'slot') {
      this.effect.counter = new SpellSlotReference(1);
    }
  }

}
