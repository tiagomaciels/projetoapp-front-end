import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

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

  ngOnInit(): void {}

  newUserToggle() {
    this.isChecked = !this.isChecked;
    this.isDisabled = !this.isDisabled;
  }

  // signIn() {
  //   this.submitted = true;
  //   // if (this.form.invalid) return;
  //   this.spinnerService.show();
  //   this.authService
  //     .auth(this.formLogin.value)
  //     .pipe(
  //       takeUntil(this.destroy$),
  //       finalize(() => this.spinnerService.hide())
  //     )
  //     .subscribe((resp) => {
  //       this.authService.onAuthenticate(resp);
  //       this.navigation.hide();
  //       this.modalCupom();
  //     });
  // }

  signUp() {
    // this.submitted = true;
    const data = {
      name: this.formLogin.value.name,
      email: this.formLogin.value.email,
      password: this.formLogin.value.password,
    };

    console.log(data);
    // this.spinnerService.show();

    this.authService.post(data).subscribe((resp) => {
      Swal.fire(
        `Parabéns ${data.name}!`,
        'Seu cadastro foi realizado com sucesso!',
        'success'
      );
    });

    // (error: HttpErrorResponse) => {
    //   Swal.fire(`Atenção!`, 'Ocorreu um erro ao cadastrar!', 'error');
    // };
  }
}
