import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'avr-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  username: string = "zhu.exe";
  discrim: string = "4211";
  userStats: object = {};

  constructor() {
  }

  ngOnInit() {
  }

}
