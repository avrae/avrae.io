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
  template: `
    <div class="editor-header">
      <span class="editor-header-text" [class.is-italics]="deleteState">
        {{effectNode.label}}
      </span>
      <span class="toolbar-spacer"></span>
      <span>
          <button mat-icon-button matTooltip="Move Up" *ngIf="!isFirst" (click)="moveUp()">
            <mat-icon aria-label="Move Up">arrow_upward</mat-icon>
          </button>
          <button mat-icon-button matTooltip="Move Down" *ngIf="!isLast" (click)="moveDown()">
            <mat-icon aria-label="Move Down">arrow_downward</mat-icon>
          </button>
          <button mat-icon-button
                  [color]="deleteState === 0 ? 'warn' : 'accent'"
                  matTooltip="Double click to delete."
                  (click)="delete()"
                  (clickOutside)="deleteState = 0">
            <mat-icon aria-label="Delete">delete</mat-icon>
          </button>
      </span>
    </div>

    <ng-template effectHost></ng-template>
  `,
  styleUrls: ['./effect-editor.component.css', '../shared.scss']
})
export class EffectEditorComponent implements OnInit, OnChanges {

  @Input() effectNode: AutomationEffectTreeNode;
  @Input() spell: Spell;

  @Output() changed = new EventEmitter();
  @Output() treeChanged = new EventEmitter();
  @Output() deleted = new EventEmitter();
  @ViewChild(EffectEditorDirective, {static: true}) effectEditorDirective!: EffectEditorDirective;

  deleteState = 0;  // tracks 2-click on the delete button

  get isFirst(): boolean {
    return this.effectNode.parentArray.indexOf(this.effectNode.effect) === 0;
  }

  get isLast(): boolean {
    return this.effectNode.parentArray.indexOf(this.effectNode.effect) === this.effectNode.parentArray.length - 1;
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
    const index = this.effectNode.parentArray.indexOf(this.effectNode.effect);
    const newIndex = index - 1;
    if (newIndex > -1) {
      moveItemInArray(this.effectNode.parentArray, index, newIndex);
      this.changed.emit();
      this.treeChanged.emit();
    }
  }

  moveDown() {
    const index = this.effectNode.parentArray.indexOf(this.effectNode.effect);
    const newIndex = index + 1;
    if (newIndex < this.effectNode.parentArray.length) {
      moveItemInArray(this.effectNode.parentArray, index, newIndex);
      this.changed.emit();
      this.treeChanged.emit();
    }
  }

  delete() {
    this.deleteState++;
    if (this.deleteState === 2) {  // only delete on the 2nd click
      const index = this.effectNode.parentArray.indexOf(this.effectNode.effect);
      if (index > -1) {
        this.effectNode.parentArray.splice(index, 1);
        this.changed.emit();
        this.treeChanged.emit();
        this.deleted.emit();
      }
    }
  }
}
