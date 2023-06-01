import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const wannaUrl = environment.baseUrlChatGpt + '/web-ai';
@Injectable({
  providedIn: 'root',
})
export class InteresesService {
  baseUrlDB: string = wannaUrl;

  constructor(private http: HttpClient) {}

  public insertPreferencias(preferencias: any): Observable<any> {
    return this.http.post(`${this.baseUrlDB}/crear-preferencia`, preferencias);
  }
}
