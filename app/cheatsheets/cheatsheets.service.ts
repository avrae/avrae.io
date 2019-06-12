import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

const cheatsheetsUrl = `${environment.apiURL}/cheatsheets`;

@Injectable({
  providedIn: 'root'
})
export class CheatsheetsService {

  constructor(private http: HttpClient) {
  }

  getCheatsheetList(): Observable<CheatsheetMeta[]> {
    return this.http.get<CheatsheetMeta[]>(cheatsheetsUrl);
  }

  getCheatsheet(title): Observable<string> {
    // @ts-ignore
    return this.http.get<string>(`${cheatsheetsUrl}/${title}`, {responseType: "text"});
  }
}

export class CheatsheetMeta {
  title: string;
  desc: string;
  href: string;
}
