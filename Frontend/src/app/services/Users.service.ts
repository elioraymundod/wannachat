import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UsersServiceService {
    baseUrlDB: string;


    constructor(private http: HttpClient) {
        this.baseUrlDB = environment.baseUrlDB;
    }

    public insertUser(usuario: any): Observable<any> {
        console.log('creando', usuario)
        return this.http.post(`${this.baseUrlDB}/usuarios`, usuario)
    }

    public getUserById(usuario: any): Observable<any> {
        return this.http.get<any>(`${this.baseUrlDB}/get/usuarios/${usuario}`)
    }

    public getPreferenciasByUsuario(usuario: any): Observable<any> {
        return this.http.get<any>(`${this.baseUrlDB}/get/preferencias/${usuario}`)
    }
}