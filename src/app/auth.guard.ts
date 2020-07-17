import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {getDiscordOauthUrl, isLoggedIn, navigateToDiscordOauth} from './SecurityHelper';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (isLoggedIn()) {
      return true;
    } else {
      // the discord auth endpoint requires an exact redirect_uri (no after param) so we store where the user wanted to go in localStorage
      localStorage.setItem('after-login-redirect', state.url);
      navigateToDiscordOauth();
      // > Note: The guard can also tell the router to navigate elsewhere, effectively canceling the current navigation.
      // > When doing so inside a guard, the guard should return false;
      // https://angular.io/guide/router#milestone-5-route-guards
      return false;
    }
  }
}
