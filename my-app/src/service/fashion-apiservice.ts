import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Fashion, IFashion } from '../app/classes/Fashion';

@Injectable({
  providedIn: 'root',
})
export class FashionAPIService {
  requestOptions: Object = {
    headers: new HttpHeaders().set("Content-Type", "application/json"),
    responseType: "text"
  };

  constructor(private _http: HttpClient) { }

  // Danh sách nhẹ (không kèm ảnh base64) để hiển thị list/slug
  getFashionsLite(limit: number = 50, order: string = '', style = ''): Observable<IFashion[]> {
    let params = new HttpParams().set('lite', '1').set('limit', limit);
    if (order) params = params.set('order', order);   // vd: created_desc
    if (style.trim()) params = params.set('style', style.trim());
    return this._http.get<IFashion[]>('/fashions', { params }).pipe(
      retry(3),
      catchError(this.handleError));
  }

  // Chi tiết Fashion (không kèm ảnh base64); ảnh lấy qua imageUrl()
  getFashionDetailLite(id: string | number): Observable<any> {
    const params = new HttpParams().set('lite', '1');
    return this._http.get<any>('/fashions/' + id, { params }).pipe(
      retry(3),
      catchError(this.handleError));
  }

  imageUrl(id: string | number): string {
    return '/fashions/' + id + '/image';
  }

  getFashion(id: string): Observable<any> {
    return this._http.get<any>("/fashions/" + id, this.requestOptions).pipe(
      map(res => JSON.parse(res) as Fashion),
      retry(3),
      catchError(this.handleError));
  }

  getFashions(): Observable<IFashion[]> {
    return this._http.get<IFashion[]>('/fashions').pipe(
      retry(3),
      catchError(this.handleError));
  }

  searchFashions(q: string, field: string, limit: number, measure: string = 'jaccard'): Observable<IFashion[]> {
    const params = new HttpParams()
      .set('q', q)
      .set('field', field)
      .set('limit', limit)
      .set('measure', measure);
    return this._http.get<IFashion[]>('/fashions', { params }).pipe(
      retry(3),
      catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
  postFashion(aFashion:any):Observable<any>
    {
      let jsonString=JSON.stringify(aFashion)
      return this._http.post<any>("/fashions",jsonString,this.requestOptions).pipe(
          map(res=>JSON.parse(res) as Fashion),
          retry(3),
          catchError(this.handleError))
    }
      putFashion(aFashion:any):Observable<any>
    {
      let jsonString=JSON.stringify(aFashion)
      return this._http.put<any>("/fashions",jsonString,this.requestOptions).pipe(
          map(res=>JSON.parse(res) as Fashion),
          retry(3),
          catchError(this.handleError))
    }

  deleteFashion(id: string): Observable<void> {
    return this._http.delete<void>('/fashions/' + id).pipe(
      retry(3),
      catchError(this.handleError)
    );
    
  }

  
  
}

