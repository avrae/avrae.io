import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map, share} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {WorkshopBindings, WorkshopCollection, WorkshopTag} from '../../schemas/Workshop';
import {ApiResponse, defaultErrorHandler, defaultOptions} from '../APIHelper';

const baseUrl = `${environment.apiURL}/workshop`;

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  // cached stuff
  tags: Observable<ApiResponse<WorkshopTag[]>>;
  personalSubscribedIds: string[];
  personalSubscribedIdsInflight = false;

  constructor(private http: HttpClient) {
  }

  // ==== collection operations ====
  getCollection(id: string): Observable<ApiResponse<WorkshopCollection>> {
    return this.http.get<ApiResponse<WorkshopCollection>>(`${baseUrl}/collection/${id}`, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  // ==== alias operations ====

  // ==== snippet operations ====

  // ==== subscription operations ====
  // ---- api endpoints ----
  personalSubscribe(id: string): Observable<ApiResponse<SubscriptionResponse>> {
    return this.http.put<ApiResponse<SubscriptionResponse>>(`${baseUrl}/collection/${id}/subscription/me`,
      {alias_bindings: null, snippet_bindings: null},
      defaultOptions())
      .pipe(catchError(defaultErrorHandler))
      .pipe(map(resp => {
        if (resp.success && this.personalSubscribedIds !== undefined) {
          this.personalSubscribedIds.push(id);
        }
        return resp;
      }));
  }

  personalUnsubscribe(id: string): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${baseUrl}/collection/${id}/subscription/me`, defaultOptions())
      .pipe(catchError(defaultErrorHandler))
      .pipe(map(resp => {
        if (resp.success && this.personalSubscribedIds !== undefined) {
          this.personalSubscribedIds.splice(this.personalSubscribedIds.indexOf(id), 1);
        }
        return resp;
      }));
  }

  guildSubscribe(id: string, guildId: string): Observable<ApiResponse<SubscriptionResponse>> {
    return this.http.put<ApiResponse<SubscriptionResponse>>(`${baseUrl}/collection/${id}/subscription/${guildId}`,
      {alias_bindings: null, snippet_bindings: null},
      defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  guildUnsubscribe(id: string, guildId: string): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${baseUrl}/collection/${id}/subscription/${guildId}`, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  getMySubscriptions(): Observable<ApiResponse<string[]>> {
    return this.http.get<ApiResponse<string[]>>(`${baseUrl}/subscribed/me`, defaultOptions())
      .pipe(catchError(defaultErrorHandler))
      .pipe(map(resp => {
        if (resp.success) {
          this.personalSubscribedIds = resp.data;
        }
        return resp;
      }));
  }

  // ---- helpers ----
  loadPersonalSubscribedIds() {
    if (this.personalSubscribedIds !== undefined || this.personalSubscribedIdsInflight) {
      return;
    } else {
      this.personalSubscribedIdsInflight = true;
      this.getMySubscriptions().subscribe();  // the map should populate this
    }
  }

  // ==== other ====
  getWorkshopExplore(order: string = 'popular-1w', tags: string[] = null,
                     q: string = null, page: number = 1): Observable<ApiResponse<string[]>> {
    let exploreParams = new HttpParams({fromObject: {order, page: page.toString()}});
    if (tags && tags.length) {
      exploreParams = exploreParams.append('tags', tags.join(','));
    }
    if (q) {
      exploreParams = exploreParams.append('q', q);
    }
    return this.http.get<ApiResponse<string[]>>(`${baseUrl}/explore`, defaultOptions({params: exploreParams}))
      .pipe(catchError(defaultErrorHandler));
  }


  getTags(): Observable<ApiResponse<WorkshopTag[]>> {  // cached since multiple components might want to get tags at once
    if (this.tags) {
      return this.tags;
    }
    const req = this.http.get<ApiResponse<WorkshopTag[]>>(`${baseUrl}/tags`, defaultOptions())
      .pipe(share())
      .pipe(catchError(defaultErrorHandler));
    this.tags = req;
    req.subscribe(result => this.tags = of(result));
    return req;
  }
}


export class SubscriptionResponse extends WorkshopBindings {
  new_subscription: boolean;
}
