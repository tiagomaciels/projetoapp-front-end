import { AuthService } from './../../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-books',
  templateUrl: './modal-books.component.html',
  styleUrls: ['./modal-books.component.scss']
})
export class ModalBooksComponent implements OnInit {

  user$ = this.authService.sessionUser;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
