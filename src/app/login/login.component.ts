import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import * as queryString from 'query-string';
import {environment} from '../../environments/environment';
import {isLoggedIn, removeToken, setToken} from '../SecurityHelper';

@Component({
  selector: 'avr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const snapshot = this.activatedRoute.snapshot;
    const paramMap = queryString.parse(snapshot.fragment);

    const postLoginRedirect = sessionStorage.getItem('after-login-redirect') || '/dashboard/characters';

    if ('access_token' in paramMap && 'expires_in' in paramMap) {
      setToken(paramMap.access_token.toString(), +paramMap.expires_in);
      this.router.navigateByUrl(postLoginRedirect)
        .then(() => {
          sessionStorage.removeItem('after-login-redirect');
        });
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
