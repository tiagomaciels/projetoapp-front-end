import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth.service';
import { AppService } from './../../../shared/services/app.service';

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

  ngOnInit(): void {
    this.authService.sessionUserEvent.subscribe((resp) => (this.user$ = resp));
  }

  signout() {
    this.authService.removeSession();
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    });
  }
}
