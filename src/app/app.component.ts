import {Component, OnInit} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {environment} from '../environments/environment';

@Component({
  selector: 'avr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Avrae';
  description = 'Avrae is a Discord bot designed to streamline playing D&D over Discord. ' +
    'Featuring advanced dice, SRD and character sheet integration, and initiative tracking, ' +
    'you\'ll never need another D&D bot.';

  constructor(private meta: Meta) {
    this.meta.addTags([
      {name: 'description', content: this.description},
      {property: 'og:title', content: this.title},
      {property: 'og:type', content: 'website'},
      {property: 'og:url', content: environment.baseURL},
      {property: 'og:image', content: 'https://avrae.io/assets/img/AvraeSquare.jpg'},
      {property: 'og:description', content: this.description}
    ]);
  }

  // On init function (make sure to implement OnInit is called when component is initialized
  ngOnInit() {
  }
}
