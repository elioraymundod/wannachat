import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const wannaUrl = environment.baseUrlChatGpt + '/web-ai';
@Injectable({
  providedIn: 'root',
})
export class UsersServiceService {
  baseUrlDB: string = wannaUrl;

  constructor(private http: HttpClient) {}

  public insertUser(usuario: any): Observable<any> {
    //console.log('creando', usuario);
    return this.http.post(`${this.baseUrlDB}/crear-usuario`, usuario);
  }

  public getUserById(usuario: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrlDB}/obtener-usuario/${usuario}`);
  }

  public getPreferenciasByUsuario(usuario: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrlDB}/obtener-preferencias/${usuario}`);
  }
}
