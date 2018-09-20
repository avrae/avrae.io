import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Pack} from "../schemas/homebrew/Items";
import {defaultOptions} from "../dashboard/APIHelper";

const itemsUrl = `${environment.apiURL}/homebrew/items`;

@Injectable({
  providedIn: 'root'
})
export class HomebrewSharingService {

  constructor(private http: HttpClient) {
  }

  getPack(id): Observable<Pack> {
    return this.http.get<Pack>(`${itemsUrl}/${id}`, defaultOptions());
  }

  private handleError<T>(operation = 'operation') {
    return (error: any): Observable<object> => {
      console.error(error); // log to console and hope for the best
      return of({error: `${operation} failed: ${error.error}`, success: false});
    };
  }
}
