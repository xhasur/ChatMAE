import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }
  private readonly pedidosUrl = `httop:7`;

  login(user: User): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.pedidosUrl}/tracking`)
      .pipe(
        map((respuesta) => {
          return respuesta;
        })
      );
  }

  validateLogin(user: User) : Observable<User>{
		return this.http.post('/api/user/login',{
			username : user.user,
			password : user.password
		})
	}
}
