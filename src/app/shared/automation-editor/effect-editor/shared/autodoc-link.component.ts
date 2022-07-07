import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'avr-autodoc-link',
  template: `
    <a [href]="href" target="_blank" class="doc-link">View the documentation on ReadTheDocs.</a>
  `,
  styles: ['.doc-link { display: block; margin-top: 8px; }']
})
export class AutodocLinkComponent {
  @Input() anchor: string;

  get href(): string {
    return `https://avrae.readthedocs.io/en/latest/automation_ref.html#${this.anchor}`;
  }
}
