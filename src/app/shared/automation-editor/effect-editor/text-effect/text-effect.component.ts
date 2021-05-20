import {Component, OnInit} from '@angular/core';
import {Text} from '../../../../schemas/homebrew/AutomationEffects';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-text-effect',
  template: `
    <mat-form-field class="wide">
        <textarea matInput placeholder="Description" rows="5" (change)="changed.emit()"
                  [(ngModel)]="effect.text"></textarea>
      <span matSuffix matTooltip="AnnotatedString - variables and functions allowed in braces">{{"{ }"}}</span>
    </mat-form-field>
  `,
  styleUrls: ['../effect-editor.component.css']
})
export class TextEffectComponent extends EffectComponent<Text> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
  }
}
