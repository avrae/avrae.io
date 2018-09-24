import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'avr-embed-title',
  styleUrls: ['../discord-embed.component.css'],
  template: `
    <div class="embed-title" *ngIf="title && !url" markdown [data]="title"></div>
    <a [href]="url" class="embed-title" *ngIf="title && url" markdown [data]="title"></a>
  `
})
export class EmbedTitleComponent implements OnInit {

  @Input() title: string;
  @Input() url: string;

  constructor() {
  }

  ngOnInit() {
  }

}
