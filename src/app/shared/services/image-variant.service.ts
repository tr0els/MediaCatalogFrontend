import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ImageVariant } from 'src/app/shared/models/image-variant.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ImageVariantService {
  constructor(private _http: HttpClient) { }

  create(imageVariant: ImageVariant): Observable<ImageVariant> {
    return this._http.post<ImageVariant>(environment.apiUrl + '/imageVariant', imageVariant);
  }
}
