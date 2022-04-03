import {Component, OnInit} from '@angular/core';
import {IEffect} from '../../../../schemas/homebrew/AutomationEffects';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-ieffect-effect',
  template: `
    <div fxLayout="row" fxLayoutGap="4px" class="auto-row">
      <mat-form-field fxFlex="1 2 auto">
        <input matInput placeholder="Name" (change)="changed.emit()" [(ngModel)]="effect.name" required>
      </mat-form-field>
      <mat-form-field fxFlex="1 2 auto">
        <input matInput placeholder="Duration" (change)="changed.emit()" [(ngModel)]="effect.duration" required
               matTooltip="Use -1 for infinite duration.">
        <mat-icon matSuffix matTooltip="IntExpression - variables and functions allowed, braces optional">calculate</mat-icon>
      </mat-form-field>
      <mat-form-field fxFlex="2 1 auto">
        <input matInput placeholder="Effects" (change)="changed.emit()" [(ngModel)]="effect.effects">
        <span matSuffix matTooltip="AnnotatedString - variables and functions allowed in braces">{{"{ }"}}</span>
      </mat-form-field>
    </div>

    <div style="color: red; font-weight: bold; margin-bottom: 10px; margin-top: -10px;" *ngIf="spell != null && spell.concentration && spell.name == effect.name">
      <span>
        Concentration spells create an effect with the spell name automatically, this will overwrite it, potentially breaking things.
      </span>
    </div>

    <div fxLayout="row" fxLayoutGap="8px" class="auto-row">
      <span>
        <mat-checkbox [(ngModel)]="effect.end" (change)="changed.emit();"
                      matTooltip="Whether the effect duration ticks down at the end of the turn rather than the start.">
          Ticks on end of turn?
        </mat-checkbox>
        <mat-checkbox [(ngModel)]="effect.conc" (change)="changed.emit();">
          Requires concentration?
        </mat-checkbox>
        <mat-checkbox [(ngModel)]="effect.stacking" (change)="changed.emit();"
                      matTooltip="If another effect with the same name exists, add this effect as a child instead of overwriting it.">
          Stacking?
        </mat-checkbox>
      </span>
    </div>

    <div fxLayout="row">
      <mat-form-field class="wide">
        <textarea matInput placeholder="Description" rows="3" (change)="changed.emit()"
                  [(ngModel)]="effect.desc" maxlength="500"></textarea>
        <span matSuffix matTooltip="AnnotatedString - variables and functions allowed in braces">{{"{ }"}}</span>
      </mat-form-field>
    </div>

    <div fxLayout="row" fxLayoutGap="8px">
      <mat-form-field fxFlex>
        <input matInput placeholder="Save As" class="text-monospace" (change)="changed.emit()" [(ngModel)]="effect.save_as"
               matTooltip="If supplied, saves the added effect as an automation variable. Use this in another IEffect's parent field to set this effect as its parent.">
      </mat-form-field>
      <mat-form-field fxFlex>
        <input matInput placeholder="Parent" class="text-monospace" (change)="changed.emit()" [(ngModel)]="effect.parent"
               matTooltip="If supplied, sets the added effect's parent to the given effect. This must be the same as another IEffect's save_as.">
      </mat-form-field>
    </div>
  `,
  styleUrls: ['../effect-editor.component.css']
})
export class IEffectEffectComponent extends EffectComponent<IEffect> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }
}
