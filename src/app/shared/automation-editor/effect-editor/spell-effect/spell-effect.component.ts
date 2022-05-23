import {Component, OnInit} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {DDBEntity} from '../../../../schemas/GameData';
import {CastSpell} from '../../../../schemas/homebrew/AutomationEffects';
import {GamedataService} from '../../../gamedata.service';
import {EffectComponent} from '../shared/EffectComponent';

@Component({
  selector: 'avr-spell-effect',
  template: `
    <div class="auto-row">
      <span>Cast </span>

      <mat-form-field>
        <mat-label>Spell</mat-label>
        <mat-select [value]="spellToCast" (selectionChange)="onSpellSelectionChange($event)">
          <mat-option>
            <ngx-mat-select-search placeholderLabel="Search"
                                   noEntriesFoundLabel="No matches found."
                                   ngModel (ngModelChange)="updateSearchFilteredSpells($event)">
            </ngx-mat-select-search>
          </mat-option>
          <mat-option *ngFor="let spell of searchFilteredSpells" [value]="spell">
            {{spell.name}}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <span> at level </span>

      <mat-form-field floatLabel="always" matTooltip="If a level is not provided, this defaults to the spell's level.">
        <mat-label>Spell Level</mat-label>
        <input matInput placeholder="(default level)" [(ngModel)]="effect.level" type="number" min="0" max="9">
      </mat-form-field>
    </div>

    <div>
      <mat-checkbox [(ngModel)]="custom" (change)="changed.emit(); onCustomChange()"
                    matTooltip="Whether to use the caster's default DC and attack modifier or a custom defined one.">
        Use custom spellcasting information
      </mat-checkbox>
    </div>

    <div *ngIf="custom" fxLayout="row" fxLayoutGap="4px" fxLayoutAlign="left center">
      <mat-form-field fxFlex>
        <input matInput placeholder="DC" class="text-monospace" (change)="changed.emit()" [(ngModel)]="effect.dc">
        <mat-icon matSuffix matTooltip="IntExpression - variables and functions allowed, braces optional">calculate</mat-icon>
      </mat-form-field>

      <mat-form-field fxFlex>
        <input matInput placeholder="Spell Attack Bonus" class="text-monospace" (change)="changed.emit()" [(ngModel)]="effect.attackBonus">
        <mat-icon matSuffix matTooltip="IntExpression - variables and functions allowed, braces optional">calculate</mat-icon>
      </mat-form-field>

      <mat-form-field fxFlex>
        <input matInput placeholder="Spellcasting Modifier" class="text-monospace" (change)="changed.emit()"
               [(ngModel)]="effect.castingMod">
        <mat-icon matSuffix matTooltip="IntExpression - variables and functions allowed, braces optional">calculate</mat-icon>
      </mat-form-field>
    </div>
  `,
  styleUrls: ['../effect-editor.component.css']
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
