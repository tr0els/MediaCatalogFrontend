import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class UploadService {
    constructor(private _http: HttpClient) { }

    upload(formData: FormData) {
        return this._http.post<{ path: string }>(
            environment.apiUrl + '/upload',
            formData
        );
    }
}