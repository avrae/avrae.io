import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'avr-embed-field',
  styleUrls: ['../discord-embed.component.css'],
  template: `
    <div [ngClass]="fieldClass" *ngIf="field.name && field.value">
      <div class="embed-field-name" markdown [data]="field.name"></div>
      <div class="embed-field-value" markdown [data]="field.value"></div>
    </div>
  `
})
export class EmbedFieldComponent implements OnInit {

  @Input() field: EmbedField;
  fieldClass: string;

  constructor() {
  }

  ngOnInit() {
    this.fieldClass = 'embed-field' + (this.field.inline ? ' embed-field-inline' : '');
  }

}

export class EmbedField {
  name: string;
  value: string;
  inline: boolean;
}
