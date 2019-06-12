import {HttpHeaders} from '@angular/common/http';
import {getToken} from '../SecurityHelper';
import {UserInfo} from '../schemas/UserInfo';

export function defaultOptions() {
  return {headers: new HttpHeaders({'Authorization': getToken()})};
}

export function defaultTextOptions() {
  return {responseType: 'text', headers: new HttpHeaders({'Authorization': getToken()})};
}

export function setUser(user: UserInfo) {
  sessionStorage.setItem('user', JSON.stringify(user));
}

export function getUser(): UserInfo {
  if (sessionStorage.getItem('user')) {
    return JSON.parse(sessionStorage.getItem('user'));
  }
  return null;
}

export function removeUser() {
  if (sessionStorage.getItem('user')) {
    sessionStorage.removeItem('user');
  }
}
