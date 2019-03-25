import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Spell} from '../../../../../schemas/homebrew/spell.model';

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


}
