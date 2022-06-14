import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'avr-custom-icon-dev',
  templateUrl: './custom-icon-dev.component.html',
  styleUrls: ['./custom-icon-dev.component.css']
})
export class CustomIconDevComponent {
  constructor(private iconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    iconRegistry.addSvgIconResolver((name, namespace) => {
      if (namespace === 'ddb') {
        return domSanitizer.bypassSecurityTrustResourceUrl(`/assets/icon/${name}.svg`);
      }
      return null;
    });
  }

  CUSTOM_ICONS: string[] = [
    'digital-dice',
    'fire',
    'force',
    'healing',
    'melee-attack',
    'piercing',
    'ranged-attack',
    'resistant',
    'spells'
  ];
}
