import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {parseLevel, parseSchool} from '../../schemas/homebrew/Spells';
import {UserInfo} from '../../schemas/UserInfo';
import {EmbedField} from '../discord-embed/embed-fields/embed-fields.component';

@Component({
  selector: 'avr-spell-embed',
  template: `
    <avr-discord-embed [author]="user ? {name: user.username, icon_url: user.avatarUrl} : undefined"
                       [title]="embedTitle" [description]="embedDescription" [fields]="fields" [thumbnail]="embedImage"
                       [footer]="{text: 'Homebrew content.', icon_url: '../../../../assets/img/homebrew.png'}">
    </avr-discord-embed>
  `
})
export class SpellEmbedComponent implements OnInit, OnChanges {

  @Input() name: string;
  @Input() image: string;
  @Input() level: number;
  @Input() school: string;
  @Input() classes: string;
  @Input() subclasses: string;
  @Input() verbal: boolean;
  @Input() somatic: boolean;
  @Input() material: string;
  @Input() time: string;
  @Input() ritual: boolean;
  @Input() range: string;
  @Input() concentration: boolean;
  @Input() duration: string;
  @Input() description: string;
  @Input() higherlevels: string;
  @Input() user: UserInfo;

  embedTitle: string = 'No spell selected.';
  embedDescription: string = 'Click on a spell on the left to see a preview!';
  fields: EmbedField[] = [];
  embedImage: string = '';

  undefined = undefined;


  constructor() {
  }

  updateEmbed() {
    if (!this.name) return;
    this.embedTitle = this.name;
    this.embedImage = this.image ? this.image : '';

    this.embedDescription = `*${parseLevel(this.level)} ${parseSchool(this.school).toLowerCase()}.`;
    if (this.classes || this.subclasses) {
      this.embedDescription += ' (';
      if (this.classes) {
        this.embedDescription += this.classes;
      }
      if (this.classes && this.subclasses) {
        this.embedDescription += ', ';
      }
      if (this.subclasses) {
        this.embedDescription += this.subclasses;
      }
      this.embedDescription += ')';
    }
    this.embedDescription += '*'; // ending asterisk

    let components = [];
    if (this.verbal)
      components.push('V');
    if (this.somatic)
      components.push('S');
    if (this.material)
      components.push(`M (${this.material})`);

    let newFields = [];
    newFields.push({
      name: 'Casting Time',
      value: this.time + (this.ritual ? ' (ritual)' : '')
    });
    newFields.push({name: 'Range', value: this.range});
    newFields.push({name: 'Components', value: components.join(', ')});
    newFields.push({
      name: 'Duration',
      value: (this.concentration ? 'Concentration, up to ' : '') + this.duration
    });
    newFields.push({name: 'Description', value: this.description, inline: false});

    if (this.higherlevels)
      newFields.push({name: 'At Higher Levels', value: this.higherlevels, inline: false});

    this.fields = newFields;
  }

  ngOnInit() {
    this.updateEmbed();
  }

  ngOnChanges(changes) {
    this.updateEmbed();
  }

}
