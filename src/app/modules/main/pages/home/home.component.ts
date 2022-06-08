import { AppService } from './../../../shared/services/app.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user$ = this.authService.sessionUser;

  constructor(
    private authService: AuthService,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // copyAffirmation(affirmation: string) {
  //   this.appService.copyToClipboard(affirmation);
  //   Swal.fire({
  //     position: 'top-end',
  //     icon: 'success',
  //     title: 'Afirmação copiada!',
  //     showConfirmButton: false,
  //     timer: 1500,
  //   });
  // }

  signout() {
    this.authService.removeSession();
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    });
  }
}
