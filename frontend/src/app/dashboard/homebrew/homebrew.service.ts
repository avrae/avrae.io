import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Pack} from "../../schemas/homebrew/Items";
import {Observable} from "rxjs";
import {defaultOptions} from "../APIHelper";

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
}
