import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SpellEffect} from '../../../../../../schemas/homebrew/SpellEffects';

@Component({
  selector: 'avr-effect-editor',
  templateUrl: './effect-editor.component.html',
  styleUrls: ['./effect-editor.component.css']
})
export class EffectEditorComponent implements OnInit {

  @Input() effect: SpellEffect;
  @Output() changed = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  isNumber(val) {
    return typeof val === 'number';
  }

}
