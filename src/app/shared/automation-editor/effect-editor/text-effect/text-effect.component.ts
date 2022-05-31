import {Component, OnInit} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {debounce, groupBy} from 'lodash';
import {DDBEntity} from '../../../../schemas/GameData';
import {GamedataService} from '../../../gamedata.service';
import {AbilityReference, Text} from '../../types';
import {EffectComponent} from '../shared/EffectComponent';

const TEXT_TYPE_HELPS = {
  text: 'Display the text given below when the effect is run. This is the most common way to display an ability\'s effect.',
  ref: 'Display the full description of a given feature.'
};

@Component({
  selector: 'avr-text-effect',
  templateUrl: './text-effect.component.html',
  styleUrls: ['../shared.css']
})
export class TextEffectComponent extends EffectComponent<Text> implements OnInit {
  TEXT_TYPE_HELPS = TEXT_TYPE_HELPS;
  textType: 'text' | 'ref' = 'text';
  // ref stuff
  allRefs: DDBEntity[] = [];
  searchFilteredGroupedRefs: [string, DDBEntity[]][] = [];
  selectedAbilityRef: DDBEntity;

  constructor(private gamedataService: GamedataService) {
    super();
  }

  ngOnInit() {
    this.loadRefs();
    if (typeof this.effect.text === 'string') {
      this.textType = 'text';
    } else {
      this.textType = 'ref';
    }
  }

  onTextTypeChange(): void {
    if (this.textType === 'text') {
      this.effect.text = '';
    } else {
      this.effect.text = {id: 192, typeId: 12168134};  // also second wind idk
      this.updateSelectedRef();
    }
  }

  // ref stuff
  onRefSelectionChange(event: MatSelectChange) {
    this.effect.text = {id: event.value.entity_id, typeId: event.value.type_id};
    this.selectedAbilityRef = event.value;
  }

  debouncedUpdateSearchFilteredGroupedRefs = debounce(this.updateSearchFilteredGroupedRefs, 500);

  updateSearchFilteredGroupedRefs(searchTerm: string) {
    let filteredRefs = this.allRefs.filter(lu => lu.name.toLowerCase().includes(searchTerm.toLowerCase()));
    this.searchFilteredGroupedRefs = Object.entries(groupBy(filteredRefs, lu => lu.entity_type));
  }

  updateSelectedRef() {
    let ref = this.effect.text as AbilityReference;
    this.selectedAbilityRef = this.allRefs.find(entity => entity.entity_id === ref.id && entity.type_id === ref.typeId);
  }

  loadRefs() {
    this.gamedataService.getDescribableEntities()
      .subscribe(result => {
        if (result.success) {
          this.allRefs = result.data;
          this.updateSelectedRef();
          this.updateSearchFilteredGroupedRefs('');
        }
      });
  }
}
