import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'avr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mobile = true;
  columnCount = 1;

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this.breakpointObserver.observe(Breakpoints.XSmall).subscribe(({matches}) => {
      this.mobile = matches;
      matches ? this.columnCount = 1 : this.columnCount = 3;
    });
  }

}
