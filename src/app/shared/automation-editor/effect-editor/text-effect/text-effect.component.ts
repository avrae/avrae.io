import {Component, OnInit} from '@angular/core';
import {MatSelectChange} from '@angular/material/select';
import {groupBy, debounce} from 'lodash';
import {DDBEntity} from '../../../../schemas/GameData';
import {AbilityReference, Text} from '../../../../schemas/homebrew/AutomationEffects';
import {GamedataService} from '../../../gamedata.service';
import {EffectComponent} from '../shared/EffectComponent';

const TEXT_TYPE_HELPS = {
  text: 'Display the text given below when the effect is run. This is the most common way to display an ability\'s effect.',
  ref: 'Display the full description of a given feature.'
};
const DESCRIBABLE_TYPES = [];

@Component({
  selector: 'avr-text-effect',
  template: `
    <div>
      <mat-form-field>
        <mat-label>Text Type</mat-label>
        <mat-select [(value)]="textType" (selectionChange)="changed.emit(); onTextTypeChange()">
          <mat-option value="text">
            Text
          </mat-option>
          <mat-option value="ref">
            Ability Reference
          </mat-option>
        </mat-select>
      </mat-form-field>

      <span>
        <mat-icon aria-hidden="false" aria-label="Text type help" inline
                  [matTooltip]="TEXT_TYPE_HELPS[textType]">
          help
        </mat-icon>
      </span>
    </div>

    <div *ngIf="textType === 'text'">
      <mat-form-field class="wide">
        <textarea matInput placeholder="Description" rows="5" (change)="changed.emit()"
                  [(ngModel)]="effect.text"></textarea>
        <span matSuffix matTooltip="AnnotatedString - variables and functions allowed in braces">{{"{ }"}}</span>
      </mat-form-field>
    </div>

    <div *ngIf="textType === 'ref'">
      <mat-form-field>
        <mat-label>Referenced Ability</mat-label>
        <mat-select [value]="selectedAbilityRef" (selectionChange)="onRefSelectionChange($event)">
          <mat-option>
            <!--suppress TypeScriptValidateTypes -->
            <ngx-mat-select-search placeholderLabel="Search"
                                   noEntriesFoundLabel="No matches found."
                                   ngModel (ngModelChange)="debouncedUpdateSearchFilteredGroupedRefs($event)">
            </ngx-mat-select-search>
          </mat-option>
          <mat-optgroup *ngFor="let tup of searchFilteredGroupedRefs" [label]="tup[0]">
            <mat-option *ngFor="let abilityRef of tup[1]" [value]="abilityRef">
              {{abilityRef.name}}
            </mat-option>
          </mat-optgroup>
        </mat-select>
      </mat-form-field>
    </div>
  `,
  styleUrls: ['../effect-editor.component.css']
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
      this.effect.text = new AbilityReference(192, 12168134);  // also second wind idk
      this.updateSelectedRef();
    }
  }

  // ref stuff
  onRefSelectionChange(event: MatSelectChange) {
    this.effect.text = new AbilityReference(event.value.entity_id, event.value.type_id);
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
