import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const wannaUrl = environment.baseUrlChatGpt + '/web-ai';
@Injectable({
  providedIn: 'root',
})
export class ChatGptServiceService {
  baseUrlChatGpt: string = wannaUrl;

  constructor(private http: HttpClient) {
  }

  public getRespuestaChatGpt(question: any): Observable<any> {
    return this.http.post(
      `${this.baseUrlChatGpt}/conversation/chat-bot`,
      question
    );
  }
}
