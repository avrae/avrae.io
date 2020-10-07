import {isPlatformServer} from '@angular/common';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {isLoggedIn, navigateToDiscordOauth} from './SecurityHelper';
import {setLocalStorage} from './shared/StorageUtils';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (isLoggedIn()) {
      return true;
    } else if (isPlatformServer(this.platformId)) {
      // servers cannot do auth
      // try and route to the ssr module - if it doesn't exist this will render the home page instead
      this.router.navigateByUrl(`/ssr${state.url}`);
      return false;
    } else {
      // the discord auth endpoint requires an exact redirect_uri (no after param) so we store where the user wanted to go in localStorage
      setLocalStorage('after-login-redirect', state.url);
      navigateToDiscordOauth();
      // > Note: The guard can also tell the router to navigate elsewhere, effectively canceling the current navigation.
      // > When doing so inside a guard, the guard should return false;
      // https://angular.io/guide/router#milestone-5-route-guards
      return false;
    }
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.canActivate(childRoute, state);
  }
}
