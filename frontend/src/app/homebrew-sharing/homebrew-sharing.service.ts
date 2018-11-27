import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pack} from '../schemas/homebrew/Items';

const itemsUrl = `${environment.apiURL}/homebrew/items`;

@Injectable({
  providedIn: 'root'
})
export class HomebrewSharingService {

  constructor(private http: HttpClient) {
  }

  getPack(id): Observable<Pack> {
    return this.http.get<Pack>(`${itemsUrl}/${id}`);
  }
}
