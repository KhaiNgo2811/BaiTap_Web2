import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../app/classes/IProducts';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { retry } from 'rxjs/internal/operators/retry';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ProductHttpHandleErrorService {
    private _url: string = '/dataset/product.json';
    constructor(private _http: HttpClient) {}   
    getProductList(): Observable<Product[]> {
        return this._http.get<Product[]>(this._url)
        .pipe(
            retry(3), // Retry the request up to 3 times in case of failure
            catchError((error) => this.handleError(error))
        );

}
handleError(error: any): Observable<never> {
   let errorMessage = 'An unknown error occurred.';
   if (error.error instanceof ErrorEvent) {
       // Client-side error
       errorMessage = `Error: ${error.error.message}`;
   } else {
       // Server-side error
       errorMessage = `
       Error Code: ${error.status}
       Status next: ${error.statusText}
       URL: ${error.url}
       Server Detail: ${error.error ? JSON.stringify(error.error) : 'No additional details available.'}
     `;
    }
    console.error(errorMessage);
    return throwError(() => new Error (errorMessage));  
  }
  getProductById(id: number): Observable<Product | undefined> {
    return this.getProductList().pipe(
      catchError((error) => this.handleError(error)),
      // Use map to find the product by ID
      map((products: Product[]) => products.find(product => product.id === id))
    );
  }
}
