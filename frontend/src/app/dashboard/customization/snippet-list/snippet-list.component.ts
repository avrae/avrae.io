import {Component, Input, OnInit} from '@angular/core';
import {Snippet} from "../../../schemas/Customization";

@Component({
  selector: 'avr-snippet-list',
  templateUrl: './snippet-list.component.html',
  styleUrls: ['./snippet-list.component.css']
})
export class SnippetListComponent implements OnInit {

  @Input() data: Snippet[];

  constructor() {
  }

  ngOnInit() {
  }

}
