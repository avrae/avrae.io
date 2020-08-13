import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {share} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {DiscordUser} from '../schemas/DiscordUser';

const discordUrl = `${environment.apiURL}/discord`;

@Injectable({
  providedIn: 'root'
})
export class DiscordService {

  user_cache: Map<string, Observable<DiscordUser>> = new Map<string, Observable<DiscordUser>>();

  constructor(private http: HttpClient) {
  }

  userById(id: string): Observable<DiscordUser> {
    return this.http.get<DiscordUser>(`${discordUrl}/users/${id}`);
  }


  getUser(id: string): Observable<DiscordUser> {
    if (this.user_cache.has(id)) {
      return this.user_cache.get(id);
    }
    const user = this.userById(id).pipe(share());
    this.user_cache.set(id, user);
    user.subscribe(info => this.user_cache.set(id, of(info)));
    return user;
  }
}
