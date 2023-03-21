import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Image } from 'src/app/shared/models/image.model';


@Injectable({
    providedIn: 'root'
})

export class UploadService {
    constructor(private _http: HttpClient) { }

    upload(formData: FormData) {
        return this._http.post<Image>(
            environment.apiUrl + '/upload',
            formData
        );
    }
}