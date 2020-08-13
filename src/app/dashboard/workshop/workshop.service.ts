import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, share} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {WorkshopCollection, WorkshopTag} from '../../schemas/Workshop';
import {ApiResponse, defaultErrorHandler, defaultOptions} from '../APIHelper';

const baseUrl = `${environment.apiURL}/workshop`;

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  // cached stuff
  tags: Observable<ApiResponse<WorkshopTag[]>>;

  constructor(private http: HttpClient) {
  }

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

  getMySubscriptions(): Observable<ApiResponse<string[]>> {
    return this.http.get<ApiResponse<string[]>>(`${baseUrl}/subscribed/me`, defaultOptions())
      .pipe(catchError(defaultErrorHandler));
  }

  getCollection(id: string): Observable<ApiResponse<WorkshopCollection>> {
    return this.http.get<ApiResponse<WorkshopCollection>>(`${baseUrl}/collection/${id}`, defaultOptions())
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
