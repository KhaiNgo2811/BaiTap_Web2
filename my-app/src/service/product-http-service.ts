import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../app/classes/IProducts';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({  
    providedIn: 'root'
})

export class ProductHttpService {
    private _url: string = 'dataset/product.json';
    constructor(private _http: HttpClient) {}
    getProductList(): Observable<Product[]> {   
        return this._http.get<Product[]>(this._url);
    }
}
