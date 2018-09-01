import {Component, Input, OnInit} from '@angular/core';
import {UserVar} from "../../../schemas/Customization";

@Component({
  selector: 'avr-uvar-list',
  templateUrl: './uvar-list.component.html',
  styleUrls: ['./uvar-list.component.css']
})
export class UvarListComponent implements OnInit {

  @Input() data: UserVar[];

  constructor() {
  }

  ngOnInit() {
  }

}
