import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public readonly url = `${environment.apiUrl}/users`

  constructor(private http: HttpClient) {
  }
  get = (id: string): Observable<any> =>
    this.http.get<any>(`${this.url}/${id}`).pipe(map((resp) => resp.data));
}
