import {Injectable} from '@angular/core';
import {UserInfo} from "../schemas/UserInfo";
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {defaultOptions} from "./APIHelper";
import {Character} from "../schemas/Character";


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private userInfoUrl = `${environment.apiURL}/userInfo`;
  private characterListUrl = `${environment.apiURL}/characterList`;

  constructor(private http: HttpClient) {
  }

  getUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(this.userInfoUrl, defaultOptions());
  }

  getCharacterList(): Observable<Character[]> {
    return this.http.get<Character[]>(this.characterListUrl, defaultOptions());
  }
}
