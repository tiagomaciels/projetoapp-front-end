import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  public url = `${environment.apiUrl}`;
  user$ = this.authService.sessionUser;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAll() {
    return this.http.get<any>(`${this.url}/books/users/${this.user$.id}`);
  }
}
