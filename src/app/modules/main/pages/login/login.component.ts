import { HttpErrorResponse } from '@angular/common/http';
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
  isChecked = false;
  isDisabled = true;

  formLogin = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }

  newUserToggle() {
    this.isChecked = !this.isChecked;
    this.isDisabled = !this.isDisabled;
  }

  signIn() {
    // this.submitted = true;
    // if (this.form.invalid) return;
    // this.spinnerService.show();
    this.authService
      .auth(this.formLogin.value)
      .subscribe(resp => {
        console.log(resp)
        this.authService.onAuthenticate(resp);
      });

  }

  signUp() {
    // this.submitted = true;
    const data = {
      name: this.formLogin.value.name,
      email: this.formLogin.value.email,
      password: this.formLogin.value.password,
    };

    // this.spinnerService.show();

    this.authService.post(data).subscribe((resp) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Cadastro realizado com sucesso!',
        showConfirmButton: false,
        timer: 1500
      })
    });

    // (error: HttpErrorResponse) => {
    //   Swal.fire(
    //     `Atenção!`,
    //     'Ocorreu um erro ao cadastrar!',
    //     'error'
    //   );
    // };
  }
}
