import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {Spell} from '../../schemas/homebrew/Spells';
import {AutomationEffect} from './types';
import {AutomationEffectTreeNode, AutomationTreeBuilder, AutomationTreeNode} from './utils';

// ==== component ====
@Component({
  selector: 'avr-automation-editor',
  templateUrl: './automation-editor.component.html',
  styleUrls: ['./automation-editor.component.scss']
})
export class AutomationEditorComponent implements OnInit, OnChanges {

  @Input() automation: AutomationEffect[];
  @Input() spell: Spell;
  @Output() changed = new EventEmitter();

  treeControl = new NestedTreeControl<AutomationTreeNode>(node => node.childrenSubject);
  dataSource = new MatTreeNestedDataSource<AutomationTreeNode>();
  nodeBuilder: AutomationTreeBuilder;

  constructor() {
  }

  ngOnInit(): void {
    this.nodeBuilder = new AutomationTreeBuilder(!!this.spell);
    this.refreshTree();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.refreshTree();
  }

  refreshTree() {
    this.dataSource.data = this.nodeBuilder?.effectsToNodes(this.automation);
    this.treeControl.dataNodes = this.dataSource.data;
  }

  hasChild = (node: AutomationTreeNode) => !!node.children && node.children.length > 0;
  isEffectNode = (node: AutomationTreeNode) => 'effect' in node && !!(node as AutomationEffectTreeNode).effect;
  isAddEffectNode = (node: AutomationTreeNode) => 'meta' in node;
}
