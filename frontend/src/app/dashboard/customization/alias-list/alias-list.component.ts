import {Component, Input, OnInit} from '@angular/core';
import {Alias} from "../../../schemas/Customization";

@Component({
  selector: 'avr-alias-list',
  templateUrl: './alias-list.component.html',
  styleUrls: ['./alias-list.component.css']
})
export class AliasListComponent implements OnInit {

  @Input() data: Alias[];

  constructor() {
  }

  ngOnInit() {
  }

}
