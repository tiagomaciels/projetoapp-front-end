import { AuthService } from './auth.service';
import { Injectable, NgZone } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private zone: NgZone) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.headers.has('Authorization')) {
      req = req.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.authService.accessToken}` || '',
        }),
      });
    }
    return next.handle(req).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {

            if (err.status === 406) {
              Swal.fire({
                position: 'top-end',
                icon: 'info',
                title: `E-mail e senha são obrigatórios!`,
                showConfirmButton: false,
                timer: 1500,
              });

            }

            if (err.status === 404) {
              Swal.fire({
                position: 'top-end',
                icon: 'info',
                title: `Não encontrado`,
                showConfirmButton: false,
                timer: 1500,
              });

            }

            if (err.status === 403) {
              Swal.fire({
                position: 'top-end',
                icon: 'info',
                title: `E-mail ou senha inválido`,
                showConfirmButton: false,
                timer: 1500,
              });

            }

            if (err.status === 400) {
              Swal.fire({
                position: 'top-end',
                icon: 'info',
                title: `Este e-mail já está sendo utilizado`,
                showConfirmButton: false,
                timer: 1500,
              });

            }

            if (err.status === 401) {
              Swal.fire({
                position: 'top-end',
                icon: 'info',
                title: `Não autorizado`,
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              return;
            }
          }
        }
      )
    );
  }
}
