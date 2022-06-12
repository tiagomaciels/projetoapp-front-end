import { Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth.service';
import { UsersService } from './../../../shared/services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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
    password: new FormControl('', Validators.required),
  });

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.user$);
  }

  saveUser() {
    const data = this.formUser.value;
    const id = data.id
    this.usersService.put(id, data).subscribe((resp) => {
      this.user$ = resp;
      this.authService.storeUser(this.user$)

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Informações atualizadas com sucesso!`,
        showConfirmButton: false,
        timer: 1500,
      });
    });
  }

  deleteUser(id: string){
    this.usersService.delete(id).subscribe( (resp) => {
      this.authService.removeSession();
      this.router.navigate(['login']);

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Conta excluída com sucesso!`,
        showConfirmButton: false,
        timer: 1500,
      });
    })
  }
}
