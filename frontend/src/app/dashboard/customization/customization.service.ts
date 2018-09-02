import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Alias} from "../../schemas/Customization";
import {Observable} from "rxjs";
import {defaultOptions, defaultTextOptions} from "../APIHelper";

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

  deleteAlias(alias: Alias): Observable<string> {
    // @ts-ignore
    return this.http.delete<string>(`${aliasUrl}/${alias.name}`, defaultTextOptions())
  }
}
