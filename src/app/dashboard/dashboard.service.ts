import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Attack, CharacterMeta} from '../schemas/Character';
import {Customizations} from '../schemas/Customization';
import {UserInfo, UserStats} from '../schemas/UserInfo';
import {defaultOptions, defaultTextOptions} from './APIHelper';

const userInfoUrl = `${environment.apiURL}/user`;
const userStatsUrl = `${environment.apiURL}/userStats`;

const characterBaseUrl = `${environment.apiURL}/characters`;
const characterMetaUrl = `${characterBaseUrl}/meta`;

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

  getUserStats(): Observable<UserStats> {
    return this.http.get<UserStats>(userStatsUrl, defaultOptions());
  }

  getCharacterMeta(): Observable<CharacterMeta[]> {
    return this.http.get<CharacterMeta[]>(characterMetaUrl, defaultOptions());
  }

  getCharacterAttacks(upstream: string): Observable<Attack[]> {
    const endpt = `${characterBaseUrl}/${upstream}/attacks`;
    return this.http.get<Attack[]>(endpt, defaultOptions());
  }

  putCharacterAttacks(upstream: string, attacks: Attack[]): Observable<string> {
    // Returns false if the put fails.
    const endpt = `${characterBaseUrl}/${upstream}/attacks`;
    // @ts-ignore
    return this.http.put<string>(endpt, attacks, defaultTextOptions())
      .pipe(
        catchError(_ => {
          return of(false);
        })
      );
  }

  validateAttackJSON(attacks: Attack | Attack[]): Observable<{ success: boolean, result: string }> {
    const endpt = `${characterBaseUrl}/attacks/validate`;
    return this.http.post<{ success: boolean, result: string }>(endpt, attacks, defaultOptions())
      .pipe(
        catchError(err => {
          console.error(err);
          return of({success: false, result: err.error});
        })
      );
  }

  getCustomizations(): Observable<Customizations> {
    return this.http.get<Customizations>(customizationsUrl, defaultOptions());
  }
}
