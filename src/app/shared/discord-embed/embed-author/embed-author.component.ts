import {Component, Input, OnInit} from '@angular/core';

export class EmbedAuthor {
  name: string;
  url: string;
  icon_url: string;
}

@Component({
  selector: 'avr-embed-author',
  styleUrls: ['../discord-embed.component.css'],
  template: `
    <div class='embed-author' *ngIf="author?.name">
      <img [src]="author.icon_url" *ngIf="author.icon_url" role="presentation" class="embed-author-icon">
      <span class="embed-author-name" *ngIf="!author.url">{{author.name}}</span>
      <a [href]="author.url" class="embed-author-name" *ngIf="author.url">{{author.name}}</a>
    </div>`
})
export class EmbedAuthorComponent implements OnInit {

  @Input() author: EmbedAuthor;

  constructor() {

  }

  ngOnInit() {
  }

}
