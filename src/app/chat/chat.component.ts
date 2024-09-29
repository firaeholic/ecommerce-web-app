import { Component, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../services/chat/chat.service';
import { Message } from '../shared/models/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild('chatMessages', { static: false }) private chatMessagesContainer!: ElementRef;
  messages: Message[] = [];
  newMessage: string = '';

  constructor(private chatService: ChatService) {
    this.loadDummyData();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  loadDummyData() {
    this.messages = this.chatService.getDummyMessages();
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ content: this.newMessage, sender: 'user' });

      setTimeout(() => {
        this.messages.push({ content: 'Okay', sender: 'admin' });
      }, 1000);
      
      this.newMessage = '';
    }
  }

  scrollToBottom(): void {
    try {
      this.chatMessagesContainer.nativeElement.scrollTop = this.chatMessagesContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
