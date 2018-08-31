import {Component, Input, OnInit} from '@angular/core';
import {InputMetadataWalker} from "codelyzer/noInputRenameRule";

@Component({
  selector: 'avr-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input()
  mobile: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
