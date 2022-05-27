import {moveItemInArray} from '@angular/cdk/drag-drop';
import {Component, Directive, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {AutomationEffect} from '../types';
import {Spell} from '../../../schemas/homebrew/Spells';
import {AUTOMATION_NODE_DEFS, AutomationEffectTreeNode} from '../utils';
import {EffectComponent} from './shared/EffectComponent';

@Directive({
  selector: '[effectHost]',
})
export class EffectEditorDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}

@Component({
  selector: 'avr-effect-editor',
  templateUrl: './effect-editor.component.html',
  styleUrls: ['./effect-editor.component.css']
})
export class EffectEditorComponent implements OnInit {

  @Input() effectNode: AutomationEffectTreeNode;
  @Output() changed = new EventEmitter();
  @ViewChild(EffectEditorDirective, {static: true}) effectEditorDirective!: EffectEditorDirective;

  get effect(): AutomationEffect {
    return this.effectNode.effect;
  }

  constructor() {
  }

  ngOnInit() {
    this.loadComponent();
  }

  loadComponent() {
    const componentT = AUTOMATION_NODE_DEFS[this.effectNode.effect.type]?.component;
    // todo what if component not defined

    const viewContainerRef = this.effectEditorDirective.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<EffectComponent<any>>(componentT);
    componentRef.instance.effect = this.effectNode.effect;
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
