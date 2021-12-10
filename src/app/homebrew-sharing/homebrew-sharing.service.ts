import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {ApiResponse, defaultErrorHandler} from '../dashboard/APIHelper';
import {Pack} from '../schemas/homebrew/Items';
import {Tome} from '../schemas/homebrew/Spells';

const itemsUrl = `${environment.apiURL}/homebrew/items`;
const spellsUrl = `${environment.apiURL}/homebrew/spells`;

@Injectable({
  providedIn: 'root'
})
export class HomebrewSharingService {

  constructor(private http: HttpClient) {
  }

  getPack(id): Observable<ApiResponse<Pack>> {
    return this.http.get<ApiResponse<Pack>>(`${itemsUrl}/${id}`)
      .pipe(catchError(defaultErrorHandler));
  }

  getTome(id): Observable<ApiResponse<Tome>> {
    return this.http.get<ApiResponse<Tome>>(`${spellsUrl}/${id}`)
      .pipe(catchError(defaultErrorHandler));
  }
}
