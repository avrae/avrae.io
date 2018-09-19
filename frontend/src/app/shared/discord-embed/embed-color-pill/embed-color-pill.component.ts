import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'avr-embed-color-pill',
  styleUrls: ['../discord-embed.component.css'],
  template: "<div class='embed-color-pill' [ngStyle]='style'></div>",
  styles: ["div {height: 100%; border-radius: 3px 0 0 3px;}"]
})
export class EmbedColorPillComponent implements OnInit {

  @Input() color: number;
  style: object;

  constructor() {
    let computed;
    if (this.color) {
      const c = this.extractRGB(this.color);
      computed = `rgba(${c.r},${c.g},${c.b},1)`;
    }
    this.style = {backgroundColor: computed !== undefined ? computed : '#7289DA'};
  }

  ngOnInit() {
  }

  extractRGB(i) {
    return {
      r: (i >> 16) & 0xFF,
      g: (i >> 8) & 0xFF,
      b: i & 0xFF,
    };
  }
}
