import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiResponse} from '../dashboard/APIHelper';
import {removeToken, setToken} from '../SecurityHelper';
import {AuthService} from './auth.service';

@Component({
  selector: 'avr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: string;
  working = true;


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit() {
    const paramMap = this.activatedRoute.snapshot.queryParamMap;
    const state = localStorage.getItem('expected-oauth-state');

    // validate state
    if (state === null || paramMap.get('state') !== state) {
      this.error = 'Invalid OAuth state';
      this.working = false;
      return;
    }
    localStorage.removeItem('expected-oauth-state');

    // get code
    const code = paramMap.get('code');
    if (code === null) {
      this.error = 'Invalid OAuth code grant';
      this.working = false;
      return;
    }

    // give the code to the service and exchange it for a JWT
    this.authService.exchangeCodeForJWT(code)
      .subscribe(response => this.handleJWTExchangeResponse(response));
  }

  handleJWTExchangeResponse(response: ApiResponse<{ jwt: string }>) {
    if (!response.success) {
      this.error = response.error;
      this.working = false;
    } else {
      // save the JWT to localstorage
      setToken(response.data.jwt);

      // login finished, redirect to requested page
      const postLoginRedirect = localStorage.getItem('after-login-redirect') || '/dashboard/characters';
      this.router.navigateByUrl(postLoginRedirect)
        .then(() => {
          localStorage.removeItem('after-login-redirect');
        });
    }
  }

  logout() {
    removeToken();
    this.router.navigate(['']);
  }

}
