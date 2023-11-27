import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OpenAIService{
  private apiUrl = 'https://api.openai.com/v1/completions';

  constructor(private http: HttpClient) {}

  generateCompletion(prompt: string) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + "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");
    const body = {
      'model': "text-davinci-003",
      'prompt': prompt,
      'temperature': 0,
      'max_tokens': 150,
      'top_p': 1.0,
      'frequency_penalty': 0.0,
      'presence_penalty': 0.0,
      'stop': ["#", ";"],
    };
    let completion = this.http.post(this.apiUrl, body, { headers: headers });
    console.log(completion);
    return completion;
  }

}
