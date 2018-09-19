import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'avr-embed-thumbnail',
  styleUrls: ['../discord-embed.component.css'],
  template: `
    <img [src]="thumbnail" role="presentation" class="embed-rich-thumb" style="max-width: 80px; max-height: 80px;"
         *ngIf="thumbnail">
  `
})
export class EmbedThumbnailComponent implements OnInit {

  @Input() thumbnail: string;

  constructor() {
  }

  ngOnInit() {
  }

}
