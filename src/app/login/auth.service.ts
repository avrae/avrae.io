import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {ApiResponse, defaultErrorHandler, defaultOptions} from '../dashboard/APIHelper';

const codeExchangeUrl = `${environment.apiURL}/discord/auth`;

class TokenResponse {
  jwt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  exchangeCodeForJWT(code: string): Observable<ApiResponse<TokenResponse>> {
    return this.http.post<ApiResponse<TokenResponse>>(codeExchangeUrl, {code})
      .pipe(catchError(defaultErrorHandler));
  }
}
