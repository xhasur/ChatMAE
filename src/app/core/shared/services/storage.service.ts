import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from './../model/session';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private localStorageService;
  private currentSession: Session = null;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

  loadSessionData(): Session {
    var sessionStr = this.localStorageService.getItem('currentUser');
    return sessionStr ? <Session>JSON.parse(sessionStr) : null;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return session && session.token ? session.token : null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentToken() != null ? true : false;
  }

  logout(): void {
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }
}
