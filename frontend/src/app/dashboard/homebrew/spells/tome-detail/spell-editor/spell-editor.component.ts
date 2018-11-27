import {Component, Input, OnInit} from '@angular/core';
import {Spell} from '../../../../../schemas/homebrew/Spells';

@Component({
  selector: 'avr-spell-editor',
  templateUrl: './spell-editor.component.html',
  styleUrls: ['./spell-editor.component.css']
})
export class SpellEditorComponent implements OnInit {

  @Input() spell: Spell;

  constructor() {
  }

  ngOnInit() {
  }

}
