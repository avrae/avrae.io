import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Attack, CharacterMeta} from '../schemas/Character';
import {Customizations} from '../schemas/Customization';
import {UserStats} from '../schemas/UserInfo';
import {ApiResponse, defaultErrorHandler, defaultOptions} from './APIHelper';

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

  getUserStats(): Observable<UserStats> {
    return this.http.get<UserStats>(userStatsUrl, defaultOptions());
  }

  getCharacterMeta(): Observable<CharacterMeta[]> {
    return this.http.get<CharacterMeta[]>(characterMetaUrl, defaultOptions());
  }

  // character attack stuff
  getCharacterAttacks(upstream: string): Observable<Attack[]> {
    const endpt = `${characterBaseUrl}/${upstream}/attacks`;
    return this.http.get<Attack[]>(endpt, defaultOptions());
  }

  getTemplateAttacks(): Observable<Attack[]> {
    return this.http.get<Attack[]>(`${characterBaseUrl}/attacks/srd`, defaultOptions());
  }

  putCharacterAttacks(upstream: string, attacks: Attack[]): Observable<ApiResponse<string>> {
    const endpt = `${characterBaseUrl}/${upstream}/attacks`;
    return this.http.put<ApiResponse<string>>(endpt, attacks, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  validateAttackJSON(attacks: Attack | Attack[]): Observable<ApiResponse<string>> {
    const endpt = `${characterBaseUrl}/attacks/validate`;
    return this.http.post<ApiResponse<string>>(endpt, attacks, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  getCustomizations(): Observable<Customizations> {
    return this.http.get<Customizations>(customizationsUrl, defaultOptions());
  }
}
