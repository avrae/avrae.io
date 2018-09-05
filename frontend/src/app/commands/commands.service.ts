import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommandModule} from "../schemas/Commands";

const commandsUrl = `${environment.apiURL}/commands`;

@Injectable({
  providedIn: 'root'
})
export class CommandsService {

  constructor(private http: HttpClient) {
  }

  getCommands(): Observable<{ modules: CommandModule[] }> {
    return this.http.get<{ modules: CommandModule[] }>(commandsUrl);
  }
}
