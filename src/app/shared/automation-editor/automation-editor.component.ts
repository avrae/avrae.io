import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {Spell} from '../../schemas/homebrew/Spells';
import {AutomationEffect} from './types';
import {AutomationTreeNode, effectsToNodes} from './utils';


// ==== component ====
@Component({
  selector: 'avr-automation-editor',
  templateUrl: './automation-editor.component.html',
  styleUrls: ['./automation-editor.component.scss']
})
export class AutomationEditorComponent implements OnInit {

  @Input() automation: AutomationEffect[];
  @Input() spell: Spell;
  @Output() changed = new EventEmitter();

  treeControl = new NestedTreeControl<AutomationTreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<AutomationTreeNode>();

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource.data = effectsToNodes(this.automation);
  }

  hasChild = (_: number, node: AutomationTreeNode) => !!node.children && node.children.length > 0;
  isAddEffectNode = (_, node: AutomationTreeNode) => 'parentArray' in node;
}
