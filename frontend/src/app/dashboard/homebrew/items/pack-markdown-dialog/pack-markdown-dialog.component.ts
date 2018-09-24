import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {Pack} from "../../../../schemas/homebrew/Items";

@Component({
  selector: 'avr-pack-markdown-dialog',
  templateUrl: './pack-markdown-dialog.component.html',
  styleUrls: ['./pack-markdown-dialog.component.css']
})
export class PackMarkdownDialog implements OnInit {

  mdData: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string, data: Pack }) {
    this.generateMD(this.data.data);
  }

  ngOnInit() {
  }

  generateMD(pack: Pack) {
    let markdown: string = "";
    let title = `# ${pack.name}`;
    let desc = pack.desc || "";

    markdown += `${title}\n${desc}\n\n`;

    for (let item of pack.items) {
      let itemtitle = `#### ${item.name}`;
      markdown += `${itemtitle}\n${item.meta}\n___\n${item.desc}\n\n`;
    }
    markdown = markdown.replace("\n", "\n  "); // markdown newlines

    this.mdData = markdown;
  }

  copy(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
}
