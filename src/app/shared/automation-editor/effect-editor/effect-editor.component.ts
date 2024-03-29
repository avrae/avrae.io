import {moveItemInArray} from '@angular/cdk/drag-drop';
import {
  Component,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {stringify as YAMLStringify} from 'yaml';
import {Spell} from '../../../schemas/homebrew/Spells';
import {AUTOMATION_NODE_DEFS, AutomationEffectTreeNode} from '../utils';
import {EffectComponent} from './shared/EffectComponent';
import {UnknownEffectComponent} from './unknown-effect/unknown-effect.component';

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
  styleUrls: ['./effect-editor.component.css', '../shared.scss', './shared.scss']
})
export class EffectEditorComponent implements OnInit, OnChanges {

  @Input() effectNode: AutomationEffectTreeNode;
  @Input() spell: Spell;
  @Input() debugMode = false;

  @Output() changed = new EventEmitter();
  @Output() treeChanged = new EventEmitter();
  @Output() deleted = new EventEmitter();
  @ViewChild(EffectEditorDirective, {static: true}) effectEditorDirective!: EffectEditorDirective;

  get isFirst(): boolean {
    return this.effectNode.context.parentArray.indexOf(this.effectNode.effect) === 0;
  }

  get isLast(): boolean {
    return this.effectNode.context.parentArray.indexOf(this.effectNode.effect) === this.effectNode.context.parentArray.length - 1;
  }

  constructor() {
  }

  ngOnInit() {
    this.loadComponent();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadComponent();
  }

  loadComponent() {
    const componentT = AUTOMATION_NODE_DEFS[this.effectNode.effect.type]?.component ?? UnknownEffectComponent;

    const viewContainerRef = this.effectEditorDirective.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<EffectComponent<any>>(componentT);
    componentRef.instance.effectNode = this.effectNode;
    componentRef.instance.spell = this.spell;
    componentRef.instance.changed.subscribe(() => {
      this.changed.emit();
    });
    componentRef.instance.treeChanged.subscribe(() => {
      this.treeChanged.emit();
    });
    componentRef.instance.deleted.subscribe(() => {
      this.deleted.emit();
    });
  }

  moveUp() {
    const index = this.effectNode.context.parentArray.indexOf(this.effectNode.effect);
    const newIndex = index - 1;
    if (newIndex > -1) {
      moveItemInArray(this.effectNode.context.parentArray, index, newIndex);
      this.changed.emit();
      this.treeChanged.emit();
    }
  }

  moveDown() {
    const index = this.effectNode.context.parentArray.indexOf(this.effectNode.effect);
    const newIndex = index + 1;
    if (newIndex < this.effectNode.context.parentArray.length) {
      moveItemInArray(this.effectNode.context.parentArray, index, newIndex);
      this.changed.emit();
      this.treeChanged.emit();
    }
  }

  delete() {
    const index = this.effectNode.context.parentArray.indexOf(this.effectNode.effect);
    if (index > -1) {
      this.effectNode.context.parentArray.splice(index, 1);
      this.changed.emit();
      this.treeChanged.emit();
      this.deleted.emit();
    }
  }

  // ==== debug mode helpers ====
  get effectYAML(): string {
    return YAMLStringify(this.effectNode.effect);
  }
}
