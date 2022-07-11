import {Component, OnInit} from '@angular/core';
import {EffectComponent} from '../shared/EffectComponent';
import {parse as YAMLParse, stringify as YAMLStringify} from 'yaml';

@Component({
  selector: 'avr-unknown-effect',
  templateUrl: './unknown-effect.component.html',
  styleUrls: ['../shared.scss']
})
export class UnknownEffectComponent extends EffectComponent<any> implements OnInit {

  userKnowsWhatTheyreDoing = false;
  editedYaml: string;
  error: string;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.editedYaml = YAMLStringify(this.effect);
  }

  updateEffectData() {
    this.error = null;

    let parsed;
    try {
      parsed = YAMLParse(this.editedYaml);
    } catch (e) {
      this.error = `Could not parse YAML: ${e}`;
      return;
    }

    // replace the node in the parent array
    const idx = this.effectNode.context.parentArray.indexOf(this.effectNode.effect);
    this.effectNode.context.parentArray[idx] = parsed;
    // lol good luck
    this.changed.emit();
    this.treeChanged.emit();
    this.deleted.emit();
  }
}
