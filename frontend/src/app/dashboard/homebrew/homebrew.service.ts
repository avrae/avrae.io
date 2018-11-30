import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Item, Pack} from "../../schemas/homebrew/Items";
import {Observable, of} from "rxjs";
import {defaultOptions, defaultTextOptions} from "../APIHelper";
import {catchError} from "rxjs/operators";

const itemsUrl = `${environment.apiURL}/homebrew/items`;

@Injectable({
  providedIn: 'root'
})
export class HomebrewService {

  constructor(private http: HttpClient) {
  }

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

  private handleError<T>(operation = 'operation') {
    return (error: any): Observable<object> => {
      console.error(error); // log to console and hope for the best
      return of({error: `${operation} failed: ${error.error}`, success: false});
    };
  }
}
