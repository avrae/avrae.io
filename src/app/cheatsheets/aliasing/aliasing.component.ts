import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'avr-aliasing',
  templateUrl: './aliasing.component.html',
  styleUrls: ['./aliasing.component.css'],
  interpolation: ['{{{', '}}}'] // please don't parse my docs
})
export class AliasingComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  scrollTo(id: string) {
    let el = document.getElementById(id);
    el.scrollIntoView({behavior: 'smooth'});
  }

}
