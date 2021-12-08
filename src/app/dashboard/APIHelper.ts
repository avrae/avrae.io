import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable, of} from 'rxjs';
import {getUserAvatarUrl} from '../schemas/Discord';
import {UserInfo} from '../schemas/UserInfo';
import {getToken} from '../SecurityHelper';

// api response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
}

// api options
export function defaultOptions(additionalOptions = {}) {
  return {
    headers: new HttpHeaders({'Authorization': getToken()}),
    ...additionalOptions
  };
}

// 'any' type here is to prevent ts freaking out about return type not matching an overload
export function defaultTextOptions(additionalOptions = {}): any {
  return {
    responseType: 'text',
    headers: new HttpHeaders({'Authorization': getToken()}),
    ...additionalOptions
  };
}

// user session
export function getUser(): UserInfo {  // parse from JWT
  const helper = new JwtHelperService();
  const decodedToken = helper.decodeToken(getToken());
  return {
    id: decodedToken.id,
    username: decodedToken.username,
    avatarUrl: getUserAvatarUrl(decodedToken.id, decodedToken.avatar),
    discriminator: decodedToken.discriminator
  } as UserInfo;
}

// error handling
export function defaultErrorHandler(err: HttpErrorResponse): Observable<ApiResponse<any>> {
  console.error(err);
  return of({...err.error, status: err.status, success: false} as ApiResponse<any>);
}

export function defaultTextErrorHandler(err: HttpErrorResponse): Observable<ApiResponse<any>> {
  console.error(err);
  return of({error: err.error, status: err.status, success: false} as ApiResponse<any>);
}
