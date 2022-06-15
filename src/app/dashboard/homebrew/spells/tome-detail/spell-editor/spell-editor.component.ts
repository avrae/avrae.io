import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AutomationEffect} from '../../../../../shared/automation-editor/types';
import {Spell} from '../../../../../schemas/homebrew/Spells';

@Component({
  selector: 'avr-spell-editor',
  templateUrl: './spell-editor.component.html',
  styleUrls: ['./spell-editor.component.css']
})
export class SpellEditorComponent implements OnInit {

  @Input() spell: Spell;
  @Output() changed = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  getAutomation(spell: Spell): AutomationEffect[] {
    if (spell.automation === null) {
      spell.automation = [];
    }
    return spell.automation;
  }


}
