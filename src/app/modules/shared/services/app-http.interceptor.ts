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
            if (
              err.status === 401 ||
              err.status === 403 ||
              err.status === 404
            ) {
              // this.alertErrorService.toastrErrorAlert('Email e senha não existem ou não coincidem.','');
              setTimeout('window.location.reload()', 3000);
            }
            if (err.status === 401 || err.status === 403) {
              // this.alertErrorService.toastrErrorAlert('Sua sessão expirou. Faça o login novamente.', err.status.toString());
              setTimeout('window.location.reload()', 3000);
              // this.usersService.logout();
            } else {
              return;
            }
          }
        }
      )
    );
  }
}

// let newRequest = request.headers.has('Authorization')
//   ? request.clone({})
//   : request.clone({
//       setHeaders: {
//         Authorization: `Bearer ${this.authService.accessToken}`,
//       },
//     });
// return next.handle(newRequest)

// .pipe(
//   tap(
//     (event: HttpEvent<any>) => {},
//     (error: HttpErrorResponse) => {
//       this.zone.run(() => {
//         if (error instanceof HttpErrorResponse) {
//           let response = <HttpErrorResponse>error;

//           if (response.status == 401) {
//             if (
//               response.error &&
//               response.error.errors &&
//               response.error.errors.length > 0
//             ) {
//               this.resolveErrors(response.error);
//             } else {
//               this.authService.removeUser();
//             }
//           } else if (response.status == 404) {
//             this.resolveErrors({}, [
//               {
//                 value: 'Recurso não encontrado',
//               },
//             ]);
//           } else if (response.status == 422) {
//             this.resolveErrors({}, [
//               {
//                 value: 'Entidade não processável',
//               },
//             ]);
//           } else {
//             this.resolveErrors(response);
//           }
//         } else {
//           this.resolveErrors(error);
//         }
//       });
//     }
//   )
// );
// }

// private resolveErrors(response: any, refErrors: any[] = []) {
//   let errors: any[] = response.error
//     ? response.error.errors || []
//     : response.errors || [];
//   errors = errors.concat(refErrors);
//   if (errors.length === 0) {
//     errors.push({
//       value: 'Ocorreu um erro desconhecido!',
//     });
//   }

//   let msg = `<ul>${errors.map((e) => `<li>${e}</li>`).join('')}</ul>`;
//   // this.toastrService.error(msg);
// }
// }
