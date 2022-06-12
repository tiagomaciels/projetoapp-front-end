import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  user$ = this.authService.sessionUser;
  isChecked = false;
  isDisabled = true;

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required)
  });


  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  newUserToggle() {
    this.isChecked = !this.isChecked;
    this.isDisabled = !this.isDisabled;
  }

  signIn() {
    this.authService.auth(this.formLogin.value).subscribe((resp) => {
      this.authService.onAuthenticate(resp);
    });
  }

  signUp() {
    const data = {
      name: this.formLogin.value.name,
      email: this.formLogin.value.email,
      password: this.formLogin.value.password,
    };

    this.authService.post(data).subscribe((resp) => {
      this.signIn();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Cadastro realizado com sucesso!',
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }
}
