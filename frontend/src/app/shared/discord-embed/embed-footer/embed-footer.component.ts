import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'avr-embed-footer',
  styleUrls: ['../discord-embed.component.css'],
  template: `
    <div *ngIf="footer?.text || footer?.timestamp">
      <img [src]="footer.icon_url" class="embed-footer-icon" role="presentation" width="20" height="20"
           *ngIf="footer.icon_url">
      <span class="embed-footer">{{footerText}}</span>
    </div>
  `
})
export class EmbedFooterComponent implements OnInit {

  @Input() footer: EmbedFooter;
  footerText: string;

  constructor() {
    if (this.footer) {
      let time = this.footer.timestamp ? this.footer.timestamp.toLocaleString() : null;
      this.footerText = [this.footer.text, time].filter(Boolean).join(' | ');
    }
  }

  ngOnInit() {
  }

}

export class EmbedFooter {
  timestamp: Date;
  text: string;
  icon_url: string;
}
