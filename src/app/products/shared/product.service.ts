import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ProductDto } from 'src/app/shared/dtos/product.dto';
import {environment} from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) {}

  getAll(): Observable<ProductDto[]> {
    return this._http
      .get<ProductDto[]>(environment.apiUrl + '/product');
  }
}
