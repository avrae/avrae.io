import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'avr-embed-fields',
  styleUrls: ['../discord-embed.component.css'],
  template: `
    <div class="embed-fields" *ngIf="fields?.length">
      <div [ngClass]="'embed-field' + (field.inline !== false ? ' embed-field-inline' : '')" *ngFor="let field of fields">
        <div class="embed-field-name" markdown [data]="field.name"></div>
        <div class="embed-field-value" markdown [data]="field.value"></div>
      </div>
    </div>
  `
})
export class EmbedFieldsComponent implements OnInit {

  @Input() fields: EmbedField[];

  constructor() {
  }

  ngOnInit() {
  }

}

export class EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}
