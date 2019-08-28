import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {parseComponents, parseLevel, parseSchool, Spell, Tome} from '../../../../../schemas/homebrew/Spells';

@Component({
  selector: 'avr-tome-markdown-dialog',
  templateUrl: './tome-markdown-dialog.component.html',
  styleUrls: ['./tome-markdown-dialog.component.css'],
  preserveWhitespaces: true
})
export class TomeMarkdownDialog implements OnInit {

  mdData: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string, data: Tome }) {
    this.generateMD(this.data.data);
  }

  ngOnInit() {
  }

  generateMD(tome: Tome) {
    let markdown = '';
    const title = `# ${tome.name}`;
    const desc = tome.desc || '';

    markdown += `${title}\n${desc}\n\n`;

    for (const spell of tome.spells) {
      markdown += this.generateSpellMD(spell);
    }
    markdown = markdown.replace('\n', '\n  '); // markdown newlines

    this.mdData = markdown;
  }

  generateSpellMD(spell: Spell) {
    const title = `#### ${spell.name}`;
    const schlev = spell.level ?
      `${parseLevel(spell.level)} ${parseSchool(spell.school)}` :
      `${parseSchool(spell.school)} ${parseLevel(spell.level)}`;

    const meta = `- **Casting Time:** ${spell.casttime + (spell.ritual ? ' (ritual)' : '')}
- **Range:** ${spell.range}
- **Components:** ${parseComponents(spell)}
- **Duration:** ${(spell.concentration ? 'Concentration, up to ' : '') + spell.duration}`;

    let desc = spell.description;

    if (spell.higherlevels) {
      desc = `${desc}\n\n**At Higher Levels:** ${spell.higherlevels}`;
    }

    return `${title}
*${schlev}*
___
${meta}\n
${desc}\n\n`;
  }

  copy(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

}
