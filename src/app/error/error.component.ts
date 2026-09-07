import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'avr-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css'],
    standalone: false
})
export class ErrorComponent implements OnInit {

  constructor(private location: Location) {
  }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }

}
