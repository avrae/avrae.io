import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {UserInfo} from '../schemas/UserInfo';

const discordUrl = `${environment.apiURL}/discord`;

@Injectable({
  providedIn: 'root'
})
export class DiscordService {

  user_cache: Map<string, UserInfo> = new Map<string, UserInfo>();

  constructor(private http: HttpClient) {
  }

  userById(id: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${discordUrl}/users/${id}`);
  }


  getUser(id: string): Observable<UserInfo> {
    if (this.user_cache.has(id)) {
      return of(this.user_cache.get(id));
    }
    const user = this.userById(id);
    user.subscribe(info => this.user_cache.set(id, info));
    return user;
  }
}
