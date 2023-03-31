    import { HttpClient } from '@angular/common/http';
    import { Injectable } from '@angular/core';
    import { Observable } from 'rxjs';
    import { environment } from 'src/environments/environment';

    @Injectable({
        providedIn: 'root'
    })
    export class ChatGptServiceService {
        baseUrlChatGpt: string;


        constructor(private http: HttpClient) {
            this.baseUrlChatGpt = environment.baseUrlChatGpt;
        }

        public getRespuestaChatGpt(question: any): Observable<any> {
            return this.http.post(`${this.baseUrlChatGpt}/web-ai/message`, question)
        }
    }