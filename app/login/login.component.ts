import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {isLoggedIn, removeToken, setToken} from '../SecurityHelper';
import {environment} from '../../environments/environment';

import * as queryString from 'query-string';

@Component({
  selector: 'avr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    let snapshot = this.activatedRoute.snapshot;
    let paramMap = queryString.parse(snapshot.fragment);
    if ('access_token' in paramMap && 'expires_in' in paramMap) {
      setToken(paramMap.access_token, +paramMap.expires_in);
      this.router.navigate(['dashboard']);
    }
  }

  loggedIn() {
    return isLoggedIn();
  }

  getLoginLink() {
    return environment.loginURL;
  }

  logout() {
    removeToken();
    this.router.navigate(['']);
  }

}
