import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'avr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Avrae';

  // Initialise with mobile true - Mobile First
  mobile = true;

  constructor(private breakpointObserver: BreakpointObserver) {

  }

  // On init function (make sure to implement OnInit is called when component is initialized
  ngOnInit() {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe(({matches}) => {
      if (matches) {
        // Is Handset (Phone)
        this.mobile = true;
      }
    })
    this.breakpointObserver.observe(Breakpoints.Web).subscribe(({matches}) => {
      if (matches) {
        // Is Web (Desktop?)
        this.mobile = false;
      }
    })
  }

}
