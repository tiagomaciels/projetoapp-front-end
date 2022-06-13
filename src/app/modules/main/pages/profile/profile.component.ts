import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from './../../../shared/services/auth.service';
import { UsersService } from './../../../shared/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user$ = this.authService.sessionUser;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  formUser = new FormGroup({
    id: new FormControl(this.user$.id, Validators.required),
    name: new FormControl(this.user$.name, Validators.required),
    email: new FormControl(this.user$.email, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl(null, Validators.required),
  });

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  saveUser() {
    const data = this.formUser.value;
    const id = data.id;

    this.usersService.put(id, data).subscribe((resp) => {
      this.user$ = resp;
      this.authService.storeUser(this.user$);

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Informações atualizadas com sucesso!`,
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }

  deleteUser(id: string) {
    Swal.fire({
      title: 'Tem certeza que deseja excluir sua conta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9C27B0',
      cancelButtonColor: '#F44336',
      confirmButtonText: 'Sim, excluir minha conta!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.delete(id).subscribe((resp) => {
          this.authService.removeSession();
          this.router.navigate(['login']);
        });

        Swal.fire({
          position: 'top-end',
          title: 'Conta excluída!',
          icon: 'success',
          showConfirmButton: false,
        });
      }
    });
  }
}
