import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

const ALL_SKILLS = {
  'acrobatics': 'Acrobatics',
  'animalHandling': 'Animal Handling',
  'arcana': 'Arcana',
  'athletics': 'Athletics',
  'deception': 'Deception',
  'history': 'History',
  'initiative': 'Initiative',
  'insight': 'Insight',
  'intimidation': 'Intimidation',
  'investigation': 'Investigation',
  'medicine': 'Medicine',
  'nature': 'Nature',
  'perception': 'Perception',
  'performance': 'Performance',
  'persuasion': 'Persuasion',
  'religion': 'Religion',
  'sleightOfHand': 'Sleight of Hand',
  'stealth': 'Stealth',
  'survival': 'Survival',
  'strength': 'Strength',
  'dexterity': 'Dexterity',
  'constitution': 'Constitution',
  'intelligence': 'Intelligence',
  'wisdom': 'Wisdom',
  'charisma': 'Charisma'
};

@Component({
  selector: 'avr-ability-select',
  templateUrl: './ability-select.component.html',
  styleUrls: ['../shared.scss']
})
export class AbilitySelectComponent {

  @Input() label = 'Skills';
  @Input() required = false;

  @Input() skills!: string[];
  @Output() skillsChange = new EventEmitter<string[]>();

  skillCtrl = new FormControl('');
  filteredSkills: Observable<[string, string][]>;

  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(''),
      map((skillName: string) => (this._filter(skillName))),
    );
  }

  // utils
  skillKeyToName(key: string): string {
    return ALL_SKILLS[key] ?? 'Invalid Skill';
  }

  // autocomplete handlers
  remove(skill: string): void {
    const index = this.skills.indexOf(skill);
    if (index >= 0) {
      this.skills.splice(index, 1);
      this.skillsChange.emit(this.skills);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.skills.push(event.option.value);
    this.skillsChange.emit(this.skills);
    this.skillInput.nativeElement.value = '';
    this.skillCtrl.setValue('');
  }

  private _filter(value: string): [string, string][] {
    if (!value) {
      // not a duplicate
      return Object.entries(ALL_SKILLS).filter(([key, _]) => !this.skills.includes(key));
    }

    const filterValue = value.toLowerCase();

    return Object.entries(ALL_SKILLS)
      // matches query, not a duplicate
      .filter(
        ([key, name]) => (key.toLowerCase().includes(filterValue) || name.toLowerCase().includes(filterValue))
          && !this.skills.includes(key)
      );
  }

}
