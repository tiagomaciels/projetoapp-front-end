import { SessionUser } from '../models/session-user';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public url = `${environment.apiUrl}`;
  private _sessionUser!: SessionUser;
  sessionUserEvent = new EventEmitter<SessionUser>();

  constructor(private http: HttpClient, private router: Router) {}

  // Register
  post = (data: any): Observable<any> =>
    this.http
      .post<any>(`${this.url}/register`, data)
      .pipe(map((resp) => resp.data));

  // Login
  auth = (data: any) =>
    this.http
      .post<any>(`${this.url}/auth`, {
        ...data,
        grantType: 'password',
      })
      .pipe(map((resp) => resp));

  onAuthenticate(resp: any, currentRoute?: string) {
    this.storeSession(resp);
    Swal.fire({
      title: `${this._sessionUser.affirmation}`,
      showCloseButton: true,
      showConfirmButton: false,
    });
    if (currentRoute) {
      return;
    }
    this.router.navigate(['home']);
  }

  storeSession(session: any) {
    this.storeUser(session.user);
    this.storeAccessToken(session.access_token);
  }

  removeSession() {
    this.removeUser();
    this.removeAccessToken();
  }

  storeUser(sessionUser: SessionUser) {
    this._sessionUser = sessionUser;
    this.sessionUserEvent.next(sessionUser);
    localStorage.setItem(
      environment.localStore.user,
      JSON.stringify(sessionUser)
    );
  }

  removeUser() {
    localStorage.removeItem(environment.localStore.user);
  }

  storeAccessToken(token: string) {
    localStorage.setItem(environment.localStore.token, token);
  }

  removeAccessToken() {
    localStorage.removeItem(environment.localStore.token);
  }

  get sessionUser(): SessionUser {
    if (!this._sessionUser) {
      const jsonUserData = localStorage.getItem(environment.localStore.user);
      this._sessionUser = jsonUserData ? JSON.parse(jsonUserData) : null;
    }
    return this._sessionUser;
  }

  get accessToken(): any {
    return localStorage.getItem(environment.localStore.token);
  }

}
