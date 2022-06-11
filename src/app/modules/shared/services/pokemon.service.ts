import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  public readonly url = `${environment.apiUrl}/pokemon`;
  constructor(private http: HttpClient) {}

  get(pokemon: string): Observable<any> {
    return this.http
      .get<any>(`${this.url}/${pokemon}`)
      .pipe(map((resp) => resp));
  }
}
