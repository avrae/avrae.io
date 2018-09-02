import {Injectable} from '@angular/core';
import {UserInfo} from "../schemas/UserInfo";
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {defaultOptions} from "./APIHelper";
import {CharacterMeta} from "../schemas/Character";
import {Customizations} from "../schemas/Customization";

const userInfoUrl = `${environment.apiURL}/userInfo`;
const characterMetaUrl = `${environment.apiURL}/characters/meta`;
const customizationsUrl = `${environment.apiURL}/customizations`;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  constructor(private http: HttpClient) {
  }

  getUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(userInfoUrl, defaultOptions());
  }

  getCharacterMeta(): Observable<CharacterMeta[]> {
    return this.http.get<CharacterMeta[]>(characterMetaUrl, defaultOptions());
  }

  getCustomizations(): Observable<Customizations> {
    return this.http.get<Customizations>(customizationsUrl, defaultOptions());
  }
}
