import {BreakpointObserver} from '@angular/cdk/layout';
import {Component, OnInit} from '@angular/core';
import {isLoggedIn, navigateToDiscordOauth} from '../SecurityHelper';
import {BreakpointBaseComponent} from '../shared/breakpoints';

@Component({
  selector: 'avr-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent extends BreakpointBaseComponent implements OnInit {

  mobileMenuOpen = false;

  constructor(private bp: BreakpointObserver) {
    super(bp);
  }

  ngOnInit() {
  }

  loggedIn() {
    return isLoggedIn();
  }

  doLogin() {
    navigateToDiscordOauth();
  }

}
