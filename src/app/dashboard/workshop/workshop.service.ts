import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map, share} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {DiscordUser} from '../../schemas/Discord';
import {
  DDBEntity,
  WorkshopAlias,
  WorkshopBindings,
  WorkshopCollection,
  WorkshopCollectionFull,
  WorkshopSnippet,
  WorkshopSubscription,
  WorkshopTag
} from '../../schemas/Workshop';
import {ApiResponse, defaultErrorHandler, defaultOptions} from '../APIHelper';

const baseUrl = `${environment.apiURL}/workshop`;

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  // cached stuff
  tags: Observable<ApiResponse<WorkshopTag[]>>;
  entitlements: Observable<ApiResponse<Map<string, DDBEntity>>>;
  personalSubscribedIds: string[];
  personalSubscribedIdsInflight = false;

  constructor(private http: HttpClient) {
  }

  // ==== collection operations ====
  createCollection(name: string, description: string, imageUrl: string | null): Observable<ApiResponse<WorkshopCollection>> {
    return this.http.post<ApiResponse<WorkshopCollection>>(`${baseUrl}/collection`,
      {name: name, description: description, image: imageUrl},
      defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  getCollection(id: string): Observable<ApiResponse<WorkshopCollection>> {
    return this.http.get<ApiResponse<WorkshopCollection>>(`${baseUrl}/collection/${id}`, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  getCollectionFull(id: string): Observable<ApiResponse<WorkshopCollectionFull>> {
    return this.http.get<ApiResponse<WorkshopCollectionFull>>(`${baseUrl}/collection/${id}/full`, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  getCollectionsBatched(ids: string[]): Observable<ApiResponse<WorkshopCollection[]>> {
    return this.http.get<ApiResponse<WorkshopCollection[]>>(`${baseUrl}/collection/batch`,
      defaultOptions({params: {c: ids.join(',')}}))
      .pipe(catchError(defaultErrorHandler));
  }

  getCollectionEditors(id: string): Observable<ApiResponse<DiscordUser[]>> {
    return this.http.get<ApiResponse<DiscordUser[]>>(`${baseUrl}/collection/${id}/editors`, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  addCollectionTag(collId: string, tag: string): Observable<ApiResponse<string[]>> {
    return this.http.post<ApiResponse<string[]>>(`${baseUrl}/collection/${collId}/tag`,
      {tag},
      defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  removeCollectionTag(collId: string, tag: string): Observable<ApiResponse<string[]>> {
    return this.http.delete<ApiResponse<string[]>>(`${baseUrl}/collection/${collId}/tag`,
      defaultOptions({body: {tag}}))
      .pipe(catchError(defaultErrorHandler));
  }

  // ==== alias operations ====
  getAlias(id: string): Observable<ApiResponse<WorkshopAlias>> {
    return this.http.get<ApiResponse<WorkshopAlias>>(`${baseUrl}/alias/${id}`, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  // ==== snippet operations ====
  getSnippet(id: string): Observable<ApiResponse<WorkshopSnippet>> {
    return this.http.get<ApiResponse<WorkshopSnippet>>(`${baseUrl}/snippet/${id}`, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  // ==== subscription operations ====
  // ---- api endpoints ----
  personalSubscribe(id: string, bindings: WorkshopBindings = null): Observable<ApiResponse<SubscriptionResponse>> {
    let body;
    if (bindings === null) {
      body = {alias_bindings: null, snippet_bindings: null};
    } else {
      body = bindings;
    }
    return this.http.put<ApiResponse<SubscriptionResponse>>(`${baseUrl}/collection/${id}/subscription/me`,
      body,
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

  getMySubscription(id: string): Observable<ApiResponse<WorkshopSubscription>> {
    return this.http.get<ApiResponse<WorkshopSubscription>>(`${baseUrl}/collection/${id}/subscription/me`, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  guildSubscribe(id: string, guildId: string, bindings: WorkshopBindings = null): Observable<ApiResponse<SubscriptionResponse>> {
    let body;
    if (bindings === null) {
      body = {alias_bindings: null, snippet_bindings: null};
    } else {
      body = bindings;
    }
    return this.http.put<ApiResponse<SubscriptionResponse>>(`${baseUrl}/collection/${id}/subscription/${guildId}`,
      body,
      defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  guildUnsubscribe(id: string, guildId: string): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${baseUrl}/collection/${id}/subscription/${guildId}`, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  getGuildSubscription(id: string, guildId: string): Observable<ApiResponse<WorkshopSubscription>> {
    return this.http.get<ApiResponse<WorkshopSubscription>>(`${baseUrl}/collection/${id}/subscription/${guildId}`, defaultOptions())
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

  getGuildSubscriptions(id: string): Observable<ApiResponse<string[]>> {
    return this.http.get<ApiResponse<string[]>>(`${baseUrl}/subscribed/${id}`, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
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

  getOwnedCollectionIds(): Observable<ApiResponse<string[]>> {
    return this.http.get<ApiResponse<string[]>>(`${baseUrl}/owned`, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  getEditableCollectionIds(): Observable<ApiResponse<string[]>> {
    return this.http.get<ApiResponse<string[]>>(`${baseUrl}/editable`, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  getGuildPermissionCheck(id: string): Observable<ApiResponse<{ can_edit: boolean, message: string | null }>> {
    return this.http.get<ApiResponse<{ can_edit: boolean, message: string | null }>>(`${baseUrl}/guild-check`,
      defaultOptions({params: {g: id}}))
      .pipe(catchError(defaultErrorHandler));
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


export class SubscriptionResponse extends WorkshopBindings {
  new_subscription: boolean;
}
