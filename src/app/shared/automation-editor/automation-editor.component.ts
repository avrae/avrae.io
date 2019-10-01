import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AutomationEffect} from '../../schemas/homebrew/AutomationEffects';
import {Spell} from '../../schemas/homebrew/Spells';

@Component({
  selector: 'avr-automation-editor',
  templateUrl: './automation-editor.component.html',
  styleUrls: ['./automation-editor.component.css']
})
export class AutomationEditorComponent implements OnInit {

  @Input() automation: AutomationEffect[];
  @Input() spell: Spell;
  @Output() changed = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
