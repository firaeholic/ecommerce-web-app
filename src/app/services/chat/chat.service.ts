import { Injectable } from '@angular/core';
import { Message } from '../../models/message';



@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

  getDummyMessages(): Message[] {
    return [
      { content: 'Hello, how can I help you today?', sender: 'admin' },
      { content: 'I need help with my order', sender: 'user' }
    ];
  }
}
