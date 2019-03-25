import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SpellEffect} from '../../../../../../schemas/homebrew/SpellEffects';
import {moveItemInArray} from '@angular/cdk/drag-drop';
import {Spell} from '../../../../../../schemas/homebrew/spell.model';

@Component({
  selector: 'avr-effect-editor',
  templateUrl: './effect-editor.component.html',
  styleUrls: ['./effect-editor.component.css']
})
export class EffectEditorComponent implements OnInit {

  @Input() parent: SpellEffect[];
  @Input() spell: Spell;
  @Output() changed = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  moveUp(effect) {
    const index = this.parent.indexOf(effect);
    const newIndex = index - 1;
    if (newIndex > -1) {
      moveItemInArray(this.parent, index, newIndex);
      this.changed.emit();
    }
  }

  moveDown(effect) {
    const index = this.parent.indexOf(effect);
    const newIndex = index + 1;
    if (newIndex < this.parent.length) {
      moveItemInArray(this.parent, index, newIndex);
      this.changed.emit();
    }
  }

  delete(effect) {
    const index = this.parent.indexOf(effect);
    if (index > -1) {
      this.parent.splice(index, 1);
      this.changed.emit();
    }
  }

}
