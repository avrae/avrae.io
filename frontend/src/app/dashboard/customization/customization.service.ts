import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Alias} from "../../schemas/Customization";
import {Observable, of} from "rxjs";
import {defaultOptions, defaultTextOptions} from "../APIHelper";
import {catchError} from "rxjs/operators";
import {MatSnackBar} from "@angular/material";

const aliasUrl = `${environment.apiURL}/customizations/aliases`;

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

  private handleTextError<T>(operation = 'operation') {
    return (error: any): Observable<string> => {
      console.error(error); // log to console instead

      return of(`${operation} failed: ${error.error}`);
    };
  }
}
