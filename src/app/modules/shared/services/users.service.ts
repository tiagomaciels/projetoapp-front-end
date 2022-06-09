import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public readonly url = `${environment.apiUrl}/users`;
  user$ = this.authService.sessionUser;

  constructor(private http: HttpClient, private authService: AuthService) {}
  get(id: string): Observable<any> {
    return this.http
      .get<any>(`${this.url}/${id}`)
      .pipe(map((resp) => resp.data));
  }

  post(data: any): Observable<any> {
    return this.http
      .post<any>(`${this.url}/users/${this.user$.id}`, data)
      .pipe(map((resp) => resp.data));
  }

  put(id: string, data: any): Observable<any> {
    return this.http
      .put<any>(`${this.url}/${id}`, data)
      .pipe(map((resp) => resp));
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`).pipe(map((resp) => resp));
  }
}
