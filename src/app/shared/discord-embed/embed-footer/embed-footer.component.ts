import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'avr-embed-footer',
  styleUrls: ['../discord-embed.component.css'],
  template: `
    <img [src]="footer.icon_url" class="embed-footer-icon" role="presentation" width="20" height="20"
         *ngIf="(footer?.text || footer?.timestamp) && footer.icon_url">
    <span class="embed-footer" *ngIf="footer?.text || footer?.timestamp">{{footerText}}</span>
  `
})
export class EmbedFooterComponent implements OnInit {

  @Input() footer: EmbedFooter;
  footerText: string;

  constructor() {
  }

  ngOnInit() {
    if (this.footer) {
      let time = this.footer.timestamp ? this.footer.timestamp.toLocaleString() : null;
      this.footerText = [this.footer.text, time].filter(Boolean).join(' | ');
    }
  }

}

export class EmbedFooter {
  timestamp: Date;
  text: string;
  icon_url: string;
}
