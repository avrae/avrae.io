import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {CommandModule} from '../schemas/Commands';

const commandsUrl = `${environment.mediaURL}/commands.json`;

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
