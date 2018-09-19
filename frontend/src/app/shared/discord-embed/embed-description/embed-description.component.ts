import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'avr-embed-description',
  styleUrls: ['../discord-embed.component.css'],
  template: `
    <div class="embed-description" *ngIf="description" markdown [data]="description"></div>
  `
})
export class EmbedDescriptionComponent implements OnInit {

  @Input() description: string;

  constructor() {
  }

  ngOnInit() {
  }

}
