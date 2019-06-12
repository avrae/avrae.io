import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
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

  getPack(id): Observable<Pack> {
    return this.http.get<Pack>(`${itemsUrl}/${id}`);
  }

  getTome(id): Observable<Tome> {
    return this.http.get<Tome>(`${spellsUrl}/${id}`);
  }
}
