import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ChatGptServiceService {
    baseUrl: string;


    constructor(private http: HttpClient) {
        this.baseUrl = environment.baseUrl;
    }

    public getRespuestaChatGpt(question: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/web-ai/message`, question)
    }
}