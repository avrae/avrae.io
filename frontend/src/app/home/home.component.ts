import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'avr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mobile = true;
  columnCount = 1;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe(({matches}) => {
      this.mobile = matches;
      matches ? this.columnCount = 1 : this.columnCount = 3;
    })
  }

}
