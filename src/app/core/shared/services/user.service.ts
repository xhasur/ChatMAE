import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../model/message';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private readonly urlLogin = `http://localhost:3000/api`;

  getUsers(): Observable<User> {
    return this.http.get(`${this.urlLogin}/user`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getUser(id: string): Observable<User> {
    return this.http.get(`${this.urlLogin}/user/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put(`${this.urlLogin}/user/${id}`, { user }).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getRooms(): Observable<User> {
    return this.http.get(`${this.urlLogin}/room`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  updateChat(id: string, messages: Message[]): Observable<Message> {
    return this.http.put(`${this.urlLogin}/chat/${id}`, { messages }).pipe(
      map((response) => {
        return response;
      })
    );
  }

  loadChat(id: string): Observable<Message> {
    return this.http.get(`${this.urlLogin}/chat/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
