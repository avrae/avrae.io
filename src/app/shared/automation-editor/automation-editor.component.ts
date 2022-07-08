import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {Spell} from '../../schemas/homebrew/Spells';
import {AutomationEffect} from './types';
import {AutomationAddEffectNode, AutomationEffectTreeNode, AutomationTreeBuilder, AutomationTreeNode} from './utils';

@Component({
  selector: 'avr-automation-editor',
  templateUrl: './automation-editor.component.html',
  styleUrls: ['./automation-editor.component.scss', './shared.scss']
})
export class AutomationEditorComponent implements OnInit, OnChanges {

  @Input() automation: AutomationEffect[];
  @Input() spell: Spell;
  @Input() debugMode = false;
  @Output() changed = new EventEmitter();

  // tree
  treeControl = new NestedTreeControl<AutomationTreeNode>(node => node.childrenSubject);
  dataSource = new MatTreeNestedDataSource<AutomationTreeNode>();
  nodeBuilder: AutomationTreeBuilder;
  showEffectTree = true;

  // node editor
  selectedEffectNode: AutomationEffectTreeNode;

  constructor() {
  }

  ngOnInit(): void {
    this.nodeBuilder = new AutomationTreeBuilder(!!this.spell);
    this.refreshTree();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.refreshTree();
  }

  onNewEffectCreated(byNode: AutomationAddEffectNode) {
    // the *byNode* node just created a new effect
    this.refreshTree();
    this.changed.emit();
    // mildly hacky way to set the selected node to the newly created node
    const newEffect = byNode.context.parentArray[byNode.context.parentArray.length - 1];
    this.selectedEffectNode = this.nodeBuilder.effectTreeNodeMap.get(newEffect) ?? this.selectedEffectNode;
  }

  refreshTree() {
    this.dataSource.data = this.nodeBuilder?.effectsToNodes(this.automation);
    this.treeControl.dataNodes = this.dataSource.data;
  }

  hasChild = (node: AutomationTreeNode) => !!node.children && node.children.length > 0;
  isEffectNode = (node: AutomationTreeNode) => node instanceof AutomationEffectTreeNode;
  isAddEffectNode = (node: AutomationTreeNode) => node instanceof AutomationAddEffectNode;

  // tree actions
  toggleNode(node: AutomationTreeNode, event: MouseEvent) {
    // recursive expand on command/control-click
    if (event.metaKey || event.ctrlKey) {
      this.treeControl.toggleDescendants(node);
    } else {
      this.treeControl.toggle(node);
    }
  }

  beginEditEffectNode(node: AutomationEffectTreeNode) {
    this.selectedEffectNode = node;
  }

  toggleEffectTree() {
    this.showEffectTree = !this.showEffectTree
  }
}
