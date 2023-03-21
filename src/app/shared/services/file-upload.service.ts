import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Image } from 'src/app/shared/models/image.model';


@Injectable({
    providedIn: 'root'
})
export class FileUploadService {
    constructor(private _http: HttpClient) { }

    upload(file: File): Observable<HttpEvent<Image>> {
        const formData: FormData = new FormData();
        formData.append('file', file);

        const req = new HttpRequest('POST', environment.apiUrl + '/upload', formData, {
            reportProgress: true,
            responseType: 'json'
        });

        return this._http.request(req);
    }

    getFiles(): Observable<any> {
        return this._http.get(environment.apiUrl + '/files');
    }
}