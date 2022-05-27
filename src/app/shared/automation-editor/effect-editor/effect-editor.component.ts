import {moveItemInArray} from '@angular/cdk/drag-drop';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AutomationEffect} from '../types';
import {Spell} from '../../../schemas/homebrew/Spells';
import {AutomationEffectTreeNode} from '../utils';

@Component({
  selector: 'avr-effect-editor',
  templateUrl: './effect-editor.component.html',
  styleUrls: ['./effect-editor.component.css']
})
export class EffectEditorComponent implements OnInit {

  @Input() effectNode: AutomationEffectTreeNode;
  @Output() changed = new EventEmitter();

  get effect(): AutomationEffect {
    return this.effectNode.effect;
  }

  constructor() {
  }

  ngOnInit() {
  }

  // moveUp(effect) {
  //   const index = this.parent.indexOf(effect);
  //   const newIndex = index - 1;
  //   if (newIndex > -1) {
  //     moveItemInArray(this.parent, index, newIndex);
  //     this.changed.emit();
  //   }
  // }
  //
  // moveDown(effect) {
  //   const index = this.parent.indexOf(effect);
  //   const newIndex = index + 1;
  //   if (newIndex < this.parent.length) {
  //     moveItemInArray(this.parent, index, newIndex);
  //     this.changed.emit();
  //   }
  // }
  //
  // delete(effect) {
  //   const index = this.parent.indexOf(effect);
  //   if (index > -1) {
  //     this.parent.splice(index, 1);
  //     this.changed.emit();
  //   }
  // }

}
