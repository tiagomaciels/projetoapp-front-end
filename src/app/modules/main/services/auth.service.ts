import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  post = (data: any): Observable<any> =>
    this.http.post<any>(`${this.url}/register`, data).pipe(map((resp) => resp.data));

}
