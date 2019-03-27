import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Compendium} from '../../schemas/homebrew/compendium.model';
import {Item, Pack} from '../../schemas/homebrew/item.model';
import {Spell, Tome} from '../../schemas/homebrew/spell.model';
import {defaultOptions, defaultTextOptions} from '../APIHelper';

const itemsUrl = `${environment.apiURL}/homebrew/items`;
const spellsUrl = `${environment.apiURL}/homebrew/spells`;
const compendiumsUrl = `${environment.apiURL}/homebrew`;

@Injectable({
  providedIn: 'root'
})
export class HomebrewService {

  constructor(private http: HttpClient) {
  }

  /* -----COMPENDIUMS----- */
  getUserCompendiums(): Observable<Compendium[]> {
    return this.http.get<Compendium[]>(`${compendiumsUrl}/me`, defaultOptions());
  }

  newCompendium(compendium: { name: string, public: boolean, desc: string, image: string }): Observable<any> {
    return this.http.post<any>(`${compendiumsUrl}`, compendium, defaultOptions())
      .pipe(
        catchError(this.handleError('newCompendiums'))
      );
  }

  getCompendium(id): Observable<Compendium> {
    return this.http.get<Compendium>(`${compendiumsUrl}/${id}`, defaultOptions());
  }

  // putTome(compendium: Tome): Observable<string> {
  //   // @ts-ignore
  //   return this.http.put<string>(`${spellsUrl}/${compendium._id.$oid}`, compendium, defaultTextOptions())
  //     .pipe(
  //       catchError(this.handleError('putTome'))
  //     );
  // }
  //
  // deleteTome(compendium: Tome): Observable<string> {
  //   // @ts-ignore
  //   return this.http.delete<string>(`${spellsUrl}/${compendium._id.$oid}`, defaultTextOptions())
  //     .pipe(
  //       catchError(this.handleError('deleteTome'))
  //     );
  // }
  //
  // validateSpellJSON(data: object): Observable<{success: boolean, result: string}> {
  //   return this.http.post<{success: boolean, result: string}>(`${spellsUrl}/validate`, data, defaultOptions())
  //     .pipe(
  //       catchError(err => of({success: false, result: err.error}))
  //     );
  // }

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

  putPack(pack: Pack): Observable<string> {
    // @ts-ignore
    return this.http.put<string>(`${itemsUrl}/${pack._id.$oid}`, pack, defaultTextOptions())
      .pipe(
        catchError(this.handleError('putPack'))
      );
  }

  deletePack(pack: Pack): Observable<string> {
    // @ts-ignore
    return this.http.delete<string>(`${itemsUrl}/${pack._id.$oid}`, defaultTextOptions())
      .pipe(
        catchError(this.handleError('deletePack'))
      );
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

  putTome(tome: Tome): Observable<string> {
    // @ts-ignore
    return this.http.put<string>(`${spellsUrl}/${tome._id.$oid}`, tome, defaultTextOptions())
      .pipe(
        catchError(this.handleError('putTome'))
      );
  }

  deleteTome(tome: Tome): Observable<string> {
    // @ts-ignore
    return this.http.delete<string>(`${spellsUrl}/${tome._id.$oid}`, defaultTextOptions())
      .pipe(
        catchError(this.handleError('deleteTome'))
      );
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
