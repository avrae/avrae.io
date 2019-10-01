import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Spell} from '../../schemas/homebrew/Spells';

@Component({
  selector: 'avr-automation-editor',
  templateUrl: './automation-editor.component.html',
  styleUrls: ['./automation-editor.component.css']
})
export class AutomationEditorComponent implements OnInit {

  @Input() spell: Spell;
  @Output() changed = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
