import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as io from 'socket.io-client';
import { User } from '../model/user';
import { environment } from './../../../../environments/environment.prod';
import { Message } from './../model/message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private url = environment.apiUrl;
  private socket;
  constructor(private http: HttpClient) {
    this.socket = io(this.url);
  }

  public sendMessage(message: Message): void {
    const room = this.getRoom(message.userTo, message.userfrom);
    message.room = room;
    this.socket.emit('chatMessage', message);
  }

  public sendMessageToGroup(message: Message): void {
    this.socket.emit('chatMessage', message);
  }

  public join(usernameFrom: string, usernameTo: string): void {
    const room = this.getRoom(usernameFrom, usernameTo);
    this.socket.emit('joinRoom', room);
  }

  public joinGroup(group: string): void {
    this.socket.emit('joinRoom', group);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('message', (message) => {
        observer.next(message);
      });
    });
  };

  getRooms(): Observable<User> {
    return this.http.get(`${this.url}/api/room`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  updateChat(id: string, messages: Message[]): Observable<Message> {
    return this.http.put(`${this.url}/api/chat/${id}`, { messages }).pipe(
      map((response) => {
        return response;
      })
    );
  }

  loadChat(id: string): Observable<Message> {
    return this.http.get(`${this.url}/api/chat/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  sortAlphabets(text): string {
    return text.split('').sort().join('');
  }

  getRoom(usertTo: string, userFrom: string): string {
    const usernameLetter = usertTo.charAt(0);
    const usernameToLetter = userFrom.charAt(0);
    return this.sortAlphabets(usernameLetter + usernameToLetter);
  }
}
