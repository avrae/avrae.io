import {Injectable} from '@angular/core';
import {UserInfo, UserStats} from "../schemas/UserInfo";
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {defaultOptions} from "./APIHelper";
import {CharacterMeta} from "../schemas/Character";
import {Customizations, GlobalVar} from "../schemas/Customization";

const userInfoUrl = `${environment.apiURL}/user`;
const userStatsUrl = `${environment.apiURL}/userStats`;
const characterMetaUrl = `${environment.apiURL}/characters/meta`;
const customizationsUrl = `${environment.apiURL}/customizations`;
const gvarsUrl = `${environment.apiURL}/customizations/gvars`;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  constructor(private http: HttpClient) {
  }

  getUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(userInfoUrl, defaultOptions());
  }

  getUserStats(): Observable<UserStats> {
    return this.http.get<UserStats>(userStatsUrl, defaultOptions());
  }

  getCharacterMeta(): Observable<CharacterMeta[]> {
    return this.http.get<CharacterMeta[]>(characterMetaUrl, defaultOptions());
  }

  getCustomizations(): Observable<Customizations> {
    return this.http.get<Customizations>(customizationsUrl, defaultOptions());
  }

  getGvars(): Observable<{ owned: GlobalVar[], editable: GlobalVar[] }> {
    return this.http.get<{ owned: GlobalVar[], editable: GlobalVar[] }>(gvarsUrl, defaultOptions());
  }
}
