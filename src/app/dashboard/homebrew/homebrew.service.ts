import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Item, Pack} from '../../schemas/homebrew/Items';
import {Spell, Tome} from '../../schemas/homebrew/Spells';
import {ApiResponse, defaultOptions, defaultTextErrorHandler, defaultTextOptions} from '../APIHelper';

const itemsUrl = `${environment.apiURL}/homebrew/items`;
const spellsUrl = `${environment.apiURL}/homebrew/spells`;

@Injectable({
  providedIn: 'root'
})
export class HomebrewService {

  constructor(private http: HttpClient) {
  }

  /* -----PACKS----- */
  getUserPacks(): Observable<Pack[]> {
    return this.http.get<Pack[]>(`${itemsUrl}/me`, defaultOptions());
  }

  newPack(pack: { name: string, public: boolean, desc: string, image: string }): Observable<any> {
    return this.http.post<any>(`${itemsUrl}`, pack, defaultOptions())
      .pipe(
        catchError(this.handleError('newPack'))
      );
  }

  getPack(id): Observable<Pack> {
    return this.http.get<Pack>(`${itemsUrl}/${id}`, defaultOptions());
  }

  putPack(pack: Pack): Observable<ApiResponse<string>> {
    return this.http.put<string>(`${itemsUrl}/${pack._id.$oid}`, pack, defaultTextOptions({observe: 'response'}))
      .pipe(
        map((resp: HttpResponse<string>) => {
          return {success: resp.ok, data: resp.body, status: resp.status} as ApiResponse<string>;
        }),
        catchError(defaultTextErrorHandler)
      );
  }

  deletePack(pack: Pack): Observable<string> {
    // @ts-ignore
    return this.http.delete<string>(`${itemsUrl}/${pack._id.$oid}`, defaultTextOptions())
      .pipe(
        catchError(this.handleError('deletePack'))
      );
  }

  getPackEditors(id: string): Observable<string[]> {
    return this.http.get<string[]>(`${itemsUrl}/${id}/editors`, defaultOptions());
  }

  getTemplateItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${itemsUrl}/srd`, defaultOptions());
  }

  /* -----TOMES----- */
  getUserTomes(): Observable<Tome[]> {
    return this.http.get<Tome[]>(`${spellsUrl}/me`, defaultOptions());
  }

  newTome(tome: { name: string, public: boolean, desc: string, image: string }): Observable<any> {
    return this.http.post<any>(`${spellsUrl}`, tome, defaultOptions())
      .pipe(
        catchError(this.handleError('newTome'))
      );
  }

  getTome(id): Observable<Tome> {
    return this.http.get<Tome>(`${spellsUrl}/${id}`, defaultOptions());
  }

  putTome(tome: Tome): Observable<ApiResponse<string>> {
    return this.http.put<string>(`${spellsUrl}/${tome._id.$oid}`, tome, defaultTextOptions({observe: 'response'}))
      .pipe(
        map((resp: HttpResponse<string>) => {
          return {success: resp.ok, data: resp.body, status: resp.status} as ApiResponse<string>;
        }),
        catchError(defaultTextErrorHandler)
      );
  }

  deleteTome(tome: Tome): Observable<string> {
    // @ts-ignore
    return this.http.delete<string>(`${spellsUrl}/${tome._id.$oid}`, defaultTextOptions())
      .pipe(
        catchError(this.handleError('deleteTome'))
      );
  }

  getTomeEditors(id: string): Observable<string[]> {
    return this.http.get<string[]>(`${spellsUrl}/${id}/editors`, defaultOptions());
  }

  getTemplateSpells(): Observable<Spell[]> {
    return this.http.get<Spell[]>(`${spellsUrl}/srd`, defaultOptions());
  }

  validateSpellJSON(data: object): Observable<{ success: boolean, result: string }> {
    return this.http.post<{ success: boolean, result: string }>(`${spellsUrl}/validate`, data, defaultOptions())
      .pipe(
        catchError(err => of({success: false, result: err.error}))
      );
  }

  /* -----META----- */
  private handleError<T>(operation = 'operation') {
    return (error: any): Observable<object> => {
      console.error(error); // log to console and hope for the best
      return of({error: `${operation} failed: ${error.error}`, success: false});
    };
  }
}
