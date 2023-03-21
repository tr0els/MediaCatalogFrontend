import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private _http: HttpClient) { }

  create(product: Product): Observable<Product> {
    return this._http.post<Product>(environment.apiUrl + '/product', product);
  }

  get(id: number): Observable<Product> {
    return this._http.get<Product>(environment.apiUrl + '/product/' + id);
  }

  getAll(): Observable<Product[]> {
    return this._http.get<Product[]>(environment.apiUrl + '/product');
  }

  update(product: Product): Observable<Product> {
    return this._http.put<Product>(environment.apiUrl + '/product/' + product.id, product);
  }

  delete(id: number): Observable<Product> {
    return this._http.delete<Product>(environment.apiUrl + '/product/' + id);
  }
}
