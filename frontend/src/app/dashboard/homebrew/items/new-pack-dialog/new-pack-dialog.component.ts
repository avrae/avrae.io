import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'avr-new-pack-dialog',
  templateUrl: './new-pack-dialog.component.html',
  styleUrls: ['./new-pack-dialog.component.css']
})
export class NewPackDialog implements OnInit {

  name: string;
  public: boolean = false;
  desc: string = "";
  image: string = "";

  constructor() {
  }

  ngOnInit() {
  }

}
