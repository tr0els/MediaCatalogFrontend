import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product.model';
import { environment } from 'src/environments/environment';
import { Catalog } from '../models/catalog.model';


@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  constructor(private _http: HttpClient) { }

  create(product: Catalog): Observable<Catalog> {
    return this._http.post<Catalog>(environment.apiUrl + '/catalog', product);
  }

  get(id: number): Observable<Catalog> {
    return this._http.get<Product>(environment.apiUrl + '/catalog/' + id);
  }

  getAll(): Observable<Product[]> {
    return this._http.get<Product[]>(environment.apiUrl + '/catalog');
  }

  update(product: Product): Observable<Product> {
    return this._http.put<Product>(environment.apiUrl + '/catalog/' + product.id, product);
  }

  delete(id: number): Observable<Product> {
    return this._http.delete<Product>(environment.apiUrl + '/catalog/' + id);
  }
}
