import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class InteresesService {
    baseUrlDB: string;


    constructor(private http: HttpClient) {
        this.baseUrlDB = environment.baseUrlDB;
    }

    public insertPreferencias(preferencias: any): Observable<any> {
        return this.http.post(`${this.baseUrlDB}/preferencias`, preferencias)
    }
}