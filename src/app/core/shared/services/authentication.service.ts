import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}
  private readonly urlLogin = `http://localhost:3000/api`;

  login(user: User): Observable<User> {
    return this.http
      .post(`${this.urlLogin}/user/login`, {
        username: user.user,
        password: user.password,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
