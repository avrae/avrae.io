import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Item, Pack} from '../../schemas/homebrew/Items';
import {Spell, Tome} from '../../schemas/homebrew/Spells';
import {ApiResponse, defaultErrorHandler, defaultOptions} from '../APIHelper';

const itemsUrl = `${environment.apiURL}/homebrew/items`;
const spellsUrl = `${environment.apiURL}/homebrew/spells`;

@Injectable({
  providedIn: 'root'
})
export class HomebrewService {

  constructor(private http: HttpClient) {
  }

  /* -----PACKS----- */
  getUserPacks(): Observable<ApiResponse<Pack[]>> {
    return this.http.get<ApiResponse<Pack[]>>(`${itemsUrl}/me`, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  newPack(pack: { name: string, public: boolean, desc: string, image: string }): Observable<ApiResponse<{ packId: string }>> {
    return this.http.post<ApiResponse<{ packId: string }>>(`${itemsUrl}`, pack, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  getPack(id): Observable<ApiResponse<Pack>> {
    return this.http.get<ApiResponse<Pack>>(`${itemsUrl}/${id}`, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  putPack(pack: Pack): Observable<ApiResponse<string>> {
    // @ts-ignore
    return this.http.put<ApiResponse<string>>(`${itemsUrl}/${pack._id}`, pack, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  deletePack(pack: Pack): Observable<ApiResponse<string>> {
    // @ts-ignore
    return this.http.delete<ApiResponse<string>>(`${itemsUrl}/${pack._id}`, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  updatePackSharing(id: string, isPublic: boolean): Observable<ApiResponse<string>> {
    return this.http.patch<ApiResponse<string>>(`${itemsUrl}/${id}/sharing`, {public: isPublic}, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  getPackEditors(id: string): Observable<ApiResponse<string[]>> {
    return this.http.get<ApiResponse<string[]>>(`${itemsUrl}/${id}/editors`, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  getTemplateItems(): Observable<ApiResponse<Item[]>> {
    return this.http.get<ApiResponse<Item[]>>(`${itemsUrl}/srd`, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  /* -----TOMES----- */
  getUserTomes(): Observable<ApiResponse<Tome[]>> {
    return this.http.get<ApiResponse<Tome[]>>(`${spellsUrl}/me`, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  newTome(tome: { name: string, public: boolean, desc: string, image: string }): Observable<ApiResponse<{ tomeId: string }>> {
    return this.http.post<ApiResponse<{ tomeId: string }>>(`${spellsUrl}`, tome, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  getTome(id): Observable<ApiResponse<Tome>> {
    return this.http.get<ApiResponse<Tome>>(`${spellsUrl}/${id}`, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  putTome(tome: Tome): Observable<ApiResponse<string>> {
    return this.http.put<ApiResponse<string>>(`${spellsUrl}/${tome._id}`, tome, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  deleteTome(tome: Tome): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${spellsUrl}/${tome._id}`, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  updateTomeSharing(id: string, isPublic: boolean): Observable<ApiResponse<string>> {
    return this.http.patch<ApiResponse<string>>(`${spellsUrl}/${id}/sharing`, {public: isPublic}, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  getTomeEditors(id: string): Observable<ApiResponse<string[]>> {
    return this.http.get<ApiResponse<string[]>>(`${spellsUrl}/${id}/editors`, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  getTemplateSpells(): Observable<ApiResponse<Spell[]>> {
    return this.http.get<ApiResponse<Spell[]>>(`${spellsUrl}/srd`, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  validateSpellJSON(data: object): Observable<ApiResponse<{ success: boolean, result: string }>> {
    return this.http.post<ApiResponse<{ success: boolean, result: string }>>(`${spellsUrl}/validate`, data, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }
}
