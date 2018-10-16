import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'avr-new-pack-dialog',
  templateUrl: './new-tome-dialog.component.html',
  styleUrls: ['./new-tome-dialog.component.css']
})
export class NewTomeDialog implements OnInit {

  name: string;
  public: boolean = false;
  desc: string = "";
  image: string = "";

  constructor() {
  }

  ngOnInit() {
  }

}
