import {Component, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {CheatsheetMeta, CheatsheetsService} from './cheatsheets.service';

@Component({
  selector: 'avr-cheatsheets',
  templateUrl: './cheatsheets.component.html',
  styleUrls: ['./cheatsheets.component.css']
})
export class CheatsheetsComponent implements OnInit {

  cheatsheets: CheatsheetMeta[];

  constructor(private meta: Meta, private csService: CheatsheetsService) {
    this.meta.updateTag({
      name: 'description', content: 'Need help using some of the more advanced features of Avrae? ' +
        'You\'ll find cheatsheets here.'
    });
  }

  ngOnInit() {
    this.csService.getCheatsheetList()
      .subscribe(result => this.cheatsheets = result);
  }

}
