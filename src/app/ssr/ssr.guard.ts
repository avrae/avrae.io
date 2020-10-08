import {isPlatformServer} from '@angular/common';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SsrGuard implements CanActivate, CanLoad {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  // only allow activation if this is a server
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this._check();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean {
    return this._check();
  }

  _check(): boolean {
    return isPlatformServer(this.platformId);
  }
}
