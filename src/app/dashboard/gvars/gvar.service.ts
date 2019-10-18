import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {GlobalVar} from '../../schemas/Customization';
import {defaultOptions, defaultTextOptions} from '../APIHelper';

const gvarUrl = `${environment.apiURL}/customizations/gvars`;

@Injectable({
  providedIn: 'root'
})
export class GvarService {

  constructor(private http: HttpClient) {
  }

  getAllGvars(): Observable<{ owned: GlobalVar[], editable: GlobalVar[] }> {
    return this.http.get<{ owned: GlobalVar[], editable: GlobalVar[] }>(gvarUrl, defaultOptions());
  }

  getGvars(owned: boolean): Observable<GlobalVar[]> {
    return this.http.get<GlobalVar[]>(`${gvarUrl}/${owned ? 'owned' : 'editable'}`, defaultOptions());
  }

  newGvar(gvar: { value: string }): Observable<string> {
    // @ts-ignore
    return this.http.post<string>(`${gvarUrl}`, gvar, defaultTextOptions())
      .pipe(
        catchError(this.handleTextError('newGvar'))
      );
  }

  getGvar(key: string): Observable<GlobalVar | boolean> {
    return this.http.get<GlobalVar>(`${gvarUrl}/${key}`, defaultOptions())
      .pipe(
        catchError(_ => of(false))
      );
  }

  updateGvar(gvar: GlobalVar): Observable<string> {
    // @ts-ignore
    return this.http.post<string>(`${gvarUrl}/${gvar.key}`, gvar, defaultTextOptions())
      .pipe(
        catchError(this.handleTextError('updateGvar'))
      );
  }

  deleteGvar(gvar: GlobalVar): Observable<string> {
    // @ts-ignore
    return this.http.delete<string>(`${gvarUrl}/${gvar.key}`, defaultTextOptions())
      .pipe(
        catchError(this.handleTextError('deleteGvar'))
      );
  }

  private handleTextError<T>(operation = 'operation') {
    return (error: any): Observable<string> => {
      console.error(error); // log to console instead

      return of(`${operation} failed: ${error.error}`);
    };
  }

}
