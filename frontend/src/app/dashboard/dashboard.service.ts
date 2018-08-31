import {Injectable} from '@angular/core';
import {UserInfo} from "../schemas/UserInfo";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {getToken} from "../SecurityHelper";


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private userInfoUrl = `${environment.apiURL}/userInfo`;

  constructor(private http: HttpClient) {
  }

  getUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(this.userInfoUrl,
      {headers: new HttpHeaders({"Authorization": getToken()})});
  }
}
