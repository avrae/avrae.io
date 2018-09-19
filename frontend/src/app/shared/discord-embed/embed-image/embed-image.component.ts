import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'avr-embed-image',
  styleUrls: ['../discord-embed.component.css'],
  template: `
    <a class="embed-thumbnail embed-thumbnail-rich" *ngIf="image">
      <img class="image" role="presentation" [src]="image">
    </a>
  `
})
export class EmbedImageComponent implements OnInit {

  @Input() image: string;

  constructor() {
  }

  ngOnInit() {
  }

}
