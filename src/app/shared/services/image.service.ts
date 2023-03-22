import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Image } from '../models/image.model';


@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private _http: HttpClient) { }

  create(image: Image): Observable<Image> {
    return this._http.post<Image>(environment.apiUrl + '/image', image);
  }
}
