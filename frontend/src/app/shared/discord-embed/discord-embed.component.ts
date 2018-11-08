import {Component, Input, OnInit} from '@angular/core';
import {EmbedAuthor} from "./embed-author/embed-author.component";
import {EmbedField} from "./embed-fields/embed-fields.component";
import {EmbedFooter} from "./embed-footer/embed-footer.component";

@Component({
  selector: 'avr-discord-embed',
  templateUrl: './discord-embed.component.html',
  styleUrls: ['./discord-embed.component.css']
})
export class DiscordEmbedComponent implements OnInit {

  @Input() color: number;
  @Input() author: EmbedAuthor;
  @Input() title: string;
  @Input() url: string;
  @Input() description: string;
  @Input() fields: EmbedField[];
  @Input() thumbnail: string;
  @Input() image: string;
  @Input() footer: EmbedFooter;


  constructor() {
  }

  ngOnInit() {
  }

}
