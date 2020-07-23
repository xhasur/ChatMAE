import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { environment } from './../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private readonly urlLogin = environment.apiUrl;

  getUsers(): Observable<User> {
    return this.http.get(`${this.urlLogin}/api/user`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getUser(id: string): Observable<User> {
    return this.http.get(`${this.urlLogin}/api/user/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put(`${this.urlLogin}/api/user/${id}`, { user }).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
