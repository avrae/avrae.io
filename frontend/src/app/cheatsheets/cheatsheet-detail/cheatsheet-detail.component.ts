import {Component, OnInit} from '@angular/core';
import {CheatsheetsService} from '../cheatsheets.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'avr-cheatsheet-detail',
  templateUrl: './cheatsheet-detail.component.html',
  styleUrls: ['./cheatsheet-detail.component.css']
})
export class CheatsheetDetailComponent implements OnInit {

  text: string;

  constructor(private route: ActivatedRoute, private csService: CheatsheetsService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('title');
    this.csService.getCheatsheet(id)
      .subscribe(text => this.text = text);
  }

}
