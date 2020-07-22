import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { Message } from './../model/message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private url = 'http://localhost:3000';
  private socket;
  constructor() {
    this.socket = io(this.url);
  }

  public sendMessage(message: Message): void {
    // this.socket.emit('message', message);
    this.socket.emit('chatMessage', message);
  }

  public join(username) {
    this.socket.emit('joinRoom', username);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('message', (message) => {
        observer.next(message);
      });
    });
  };
}
