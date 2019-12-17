import {Component, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'avr-cheatsheets',
  templateUrl: './cheatsheets.component.html',
  styleUrls: ['./cheatsheets.component.css']
})
export class CheatsheetsComponent implements OnInit {


  constructor(private meta: Meta) {
    this.meta.updateTag({
      name: 'description', content: 'Need help using some of the more advanced features of Avrae? ' +
        'You\'ll find cheatsheets here.'
    });
  }

  ngOnInit() {
  }

}
