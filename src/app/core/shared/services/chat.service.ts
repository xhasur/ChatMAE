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
    const room = this.getRoom(message.userTo, message.userfrom);
    message.room = room;
    this.socket.emit('chatMessage', message);
  }

  public sendMessageToGroup(message: Message): void {
    this.socket.emit('chatMessage', message);
  }

  public join(usernameFrom: string, usernameTo: string) {
    const room = this.getRoom(usernameFrom, usernameTo);
    this.socket.emit('joinRoom', room);
  }

  public joinGroup(group: string) {
    this.socket.emit('joinRoom', group);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('message', (message) => {
        observer.next(message);
      });
    });
  };

  sortAlphabets(text): string {
    return text.split('').sort().join('');
  }

  getRoom(usertTo: string, userFrom: string): string {
    const usernameLetter = usertTo.charAt(0);
    const usernameToLetter = userFrom.charAt(0);
    return this.sortAlphabets(usernameLetter + usernameToLetter);
  }
}
