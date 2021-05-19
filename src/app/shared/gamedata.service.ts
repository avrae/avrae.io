import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map, share} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {ApiResponse, defaultErrorHandler, defaultOptions} from '../dashboard/APIHelper';
import {DDBEntity} from '../schemas/GameData';

const baseUrl = `${environment.apiURL}/gamedata`;

@Injectable({
  providedIn: 'root'
})
export class GamedataService {

  // cached stuff
  entitlements: Observable<ApiResponse<Map<string, DDBEntity>>>;

  constructor(private http: HttpClient) {
  }

  getEntitlements(): Observable<ApiResponse<Map<string, DDBEntity>>> {
    if (this.entitlements) {
      return this.entitlements;
    }
    const req = this.http.get<ApiResponse<Map<string, DDBEntity>>>(`${baseUrl}/entitlements`, defaultOptions())
      .pipe(map(resp => {
        if (resp.success) {
          resp.data = new Map(Object.entries(resp.data));
        }
        return resp;
      }))
      .pipe(share())
      .pipe(catchError(defaultErrorHandler));
    this.entitlements = req;
    req.subscribe(result => this.entitlements = of(result));
    return req;
  }

  // ---- helpers ----
  entityFromEntitlement(entityType: string, entityId: number): Observable<DDBEntity | null> {
    return this.getEntitlements()
      .pipe(map(response => {
        if (response.success) {
          const entity = response.data.get(`${entityType}-${entityId.toString()}`);
          if (entity) {
            return entity;
          }
        }
        return null;
      }));
  }
}
