import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map, share} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {ApiResponse, defaultOptions} from '../dashboard/APIHelper';
import {DiscordUser, PartialGuild} from '../schemas/Discord';

const discordUrl = `${environment.apiURL}/discord`;

@Injectable({
  providedIn: 'root'
})
export class DiscordService {

  user_cache: Map<string, Observable<DiscordUser>> = new Map<string, Observable<DiscordUser>>();
  guild_cache: Observable<PartialGuild[]>;

  constructor(private http: HttpClient) {
  }

  // api endpoints
  userById(id: string): Observable<DiscordUser> {
    return this.http.get<DiscordUser>(`${discordUrl}/users/${id}`);
  }

  fetchCurrentUserGuilds(): Observable<ApiResponse<PartialGuild[]>> {
    return this.http.get<ApiResponse<PartialGuild[]>>(`${discordUrl}/guilds`, defaultOptions());
  }

  // helpers
  getUser(id: string): Observable<DiscordUser> {
    if (this.user_cache.has(id)) {
      return this.user_cache.get(id);
    }
    const user = this.userById(id).pipe(share());
    this.user_cache.set(id, user);
    user.subscribe(info => this.user_cache.set(id, of(info)));
    return user;
  }

  getUserGuilds(): Observable<PartialGuild[]> {
    if (this.guild_cache !== undefined) {
      return this.guild_cache;
    }
    const guilds = this.fetchCurrentUserGuilds()
      .pipe(map(resp => resp.success ? resp.data : null))
      .pipe(share());
    this.guild_cache = guilds;
    guilds.subscribe(info => {
      if (info !== null) {
        this.guild_cache = of(info);
      } else {
        this.guild_cache = undefined;
      }
    });
    return guilds;
  }
}
