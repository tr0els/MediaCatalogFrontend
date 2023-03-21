import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Catalog } from '../models/catalog.model';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  constructor(private _http: HttpClient) { }

  create(product: Catalog): Observable<Catalog> {
    return this._http.post<Catalog>(environment.apiUrl + '/catalog', product);
  }

  get(id: number): Observable<Catalog> {
    return this._http.get<Catalog>(environment.apiUrl + '/catalog/' + id);
  }

  getAll(): Observable<Catalog[]> {
    return this._http.get<Catalog[]>(environment.apiUrl + '/catalog');
  }

  update(product: Catalog): Observable<Catalog> {
    return this._http.put<Catalog>(environment.apiUrl + '/catalog/' + product.id, product);
  }

  delete(id: number): Observable<Catalog> {
    return this._http.delete<Catalog>(environment.apiUrl + '/catalog/' + id);
  }
  

  // For products in catalog
  getAllInCatalog(catalogId: number): Observable<Product[]> {
    return this._http.get<Product[]>(environment.apiUrl + '/productsInCatalog/' + catalogId);
  }

  getInCatalog(catalogId: number, productId: number): Observable<Product> {
    return this._http.get<Product>(environment.apiUrl + '/productsInCatalog/' + catalogId + '/' + productId);
  }
}
