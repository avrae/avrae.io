import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Meta} from "@angular/platform-browser";

@Component({
  selector: 'avr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Avrae';

  // Initialise with mobile true - Mobile First
  mobile = true;

  constructor(private breakpointObserver: BreakpointObserver, private meta: Meta) {
    this.meta.addTags([
      {
        name: "description",
        content: "Avrae is a Discord bot designed to streamline playing D&D over Discord. " +
          "Featuring advanced dice, SRD and character sheet integration, and initiative tracking, " +
          "you'll never need another D&D bot."
      },
      {property: "og:title", content: "Avrae"},
      {property: "og:type", content: "website"},
      {property: "og:url", content: "https://avrae.io"},
      {property: "og:image", content: "https://avrae.io/assets/img/AvraeSquare.jpg"},
      {
        property: "og:description",
        content: "Avrae is a Discord bot designed to streamline playing D&D over Discord. " +
          "Featuring advanced dice, SRD and character sheet integration, and initiative tracking, " +
          "you'll never need another D&D bot."
      }
    ]);
  }

  // On init function (make sure to implement OnInit is called when component is initialized
  ngOnInit() {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe(({matches}) => {
      if (matches) {
        // Is Handset (Phone)
        this.mobile = true;
      }
    });
    this.breakpointObserver.observe(Breakpoints.Web).subscribe(({matches}) => {
      if (matches) {
        // Is Web (Desktop?)
        this.mobile = false;
      }
    });
  }
}
