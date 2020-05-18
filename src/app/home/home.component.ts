import {BreakpointObserver} from '@angular/cdk/layout';
import {Component, OnInit} from '@angular/core';
import {BreakpointBaseComponent} from '../shared/breakpoints';

@Component({
  selector: 'avr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BreakpointBaseComponent implements OnInit {

  constructor(private bp: BreakpointObserver) {
    super(bp);
  }

  ngOnInit() {
  }

  getColCount() {
    if (this.mobile) {
      return 1;
    }
    return 3;
  }
}
