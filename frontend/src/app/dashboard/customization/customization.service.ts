import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Alias, Snippet, UserVar} from "../../schemas/Customization";
import {Observable, of} from "rxjs";
import {defaultOptions, defaultTextOptions} from "../APIHelper";
import {catchError} from "rxjs/operators";

const aliasUrl = `${environment.apiURL}/customizations/aliases`;
const snippetUrl = `${environment.apiURL}/customizations/snippets`;
const uvarUrl = `${environment.apiURL}/customizations/uvars`;

@Injectable({
  providedIn: 'root'
})
export class CustomizationService {


  constructor(private http: HttpClient) {
  }

  getAliases(): Observable<Alias[]> {
    return this.http.get<Alias[]>(aliasUrl, defaultOptions())
  }

  updateAlias(alias: { name: string, commands: string }): Observable<string> {
    // @ts-ignore
    return this.http.post<string>(`${aliasUrl}/${alias.name}`, alias, defaultTextOptions())
      .pipe(
        catchError(this.handleTextError('updateAlias'))
      );
  }

  deleteAlias(alias: Alias): Observable<string> {
    // @ts-ignore
    return this.http.delete<string>(`${aliasUrl}/${alias.name}`, defaultTextOptions())
      .pipe(
        catchError(this.handleTextError('deleteAlias'))
      );
  }

  getSnippets(): Observable<Snippet[]> {
    return this.http.get<Snippet[]>(snippetUrl, defaultOptions())
  }

  updateSnippet(snippet: { name: string, snippet: string }): Observable<string> {
    // @ts-ignore
    return this.http.post<string>(`${snippetUrl}/${snippet.name}`, snippet, defaultTextOptions())
      .pipe(
        catchError(this.handleTextError('updateSnippet'))
      );
  }

  deleteSnippet(snippet: Snippet): Observable<string> {
    // @ts-ignore
    return this.http.delete<string>(`${snippetUrl}/${snippet.name}`, defaultTextOptions())
      .pipe(
        catchError(this.handleTextError('deleteSnippet'))
      );
  }

  getUvars(): Observable<UserVar[]> {
    return this.http.get<UserVar[]>(uvarUrl, defaultOptions())
  }

  updateUvar(uvar: { name: string, value: string }): Observable<string> {
    // @ts-ignore
    return this.http.post<string>(`${uvarUrl}/${uvar.name}`, uvar, defaultTextOptions())
      .pipe(
        catchError(this.handleTextError('updateUvar'))
      );
  }

  deleteUvar(uvar: UserVar): Observable<string> {
    // @ts-ignore
    return this.http.delete<string>(`${uvarUrl}/${uvar.name}`, defaultTextOptions())
      .pipe(
        catchError(this.handleTextError('deleteUvar'))
      );
  }

  private handleTextError<T>(operation = 'operation') {
    return (error: any): Observable<string> => {
      console.error(error); // log to console instead

      return of(`${operation} failed: ${error.error}`);
    };
  }
}
