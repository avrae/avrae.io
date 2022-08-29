import {Component, OnInit} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {DDBEntity} from '../../../../schemas/GameData';
import {GamedataService} from '../../../gamedata.service';
import {CastSpell} from '../../types';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-spell-effect',
  templateUrl: './spell-effect.component.html',
  styleUrls: ['../shared.scss']
})
export class SpellEffectComponent extends EffectComponent<CastSpell> implements OnInit {
  spellToCast: DDBEntity;
  allSpells: DDBEntity[] = [];
  searchFilteredSpells: DDBEntity[] = [];
  custom = false;

  constructor(private gamedataService: GamedataService) {
    super();
  }

  ngOnInit(): void {
    this.loadSpells();
    if (this.effect.dc || this.effect.attackBonus || this.effect.castingMod) {
      this.custom = true;
    }
  }

  onCustomChange() {
    if (!this.custom) {
      this.effect.dc = undefined;
      this.effect.attackBonus = undefined;
      this.effect.castingMod = undefined;
      this.effect.parent = undefined
    }
  }

  onSpellSelectionChange(event: MatSelectChange) {
    const selectedSpell: DDBEntity = event.value;
    this.effect.id = selectedSpell.entity_id;
    this.spellToCast = selectedSpell;
  }

  updateSearchFilteredSpells(searchTerm: string) {
    this.searchFilteredSpells = this.allSpells.filter(lu => lu.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  // loaders
  loadSpells() {
    this.gamedataService.getAllEntitlements()
      .subscribe(result => {
        if (result.success) {
          // pull out all the spells
          const values = Array.from(result.data.values());
          this.allSpells = values.filter(entity => entity.entity_type === 'spell');
          this.spellToCast = this.allSpells.find(spell => spell.entity_id === this.effect.id);
          this.updateSearchFilteredSpells('');
        }
      });
  }
}
