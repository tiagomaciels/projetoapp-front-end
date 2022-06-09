import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from './../../../../shared/services/auth.service';
import { BooksService } from './../../../../shared/services/books.service';

@Component({
  selector: 'app-modal-books',
  templateUrl: './modal-books.component.html',
  styleUrls: ['./modal-books.component.scss'],
})
export class ModalBooksComponent implements OnInit {
  @Input() book: any;
  user$ = this.authService.sessionUser;
  formBooks!: FormGroup;

  constructor(
    private authService: AuthService,
    private bookService: BooksService,
    private fb: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<ModalBooksComponent>
  ) {}

  ngOnInit(): void {
    this.startFormBooks();
  }

  startFormBooks(): void {
    this.formBooks = this.fb.group({
      title: [this.book.title, [Validators.required]],
      description: [this.book.description, [Validators.required]],
      release_date: [this.book.release_date, [Validators.required]],
    });
  }

  formControl = new FormControl('');

  saveBook() {
    const data = this.formBooks.value;
    const obs = this.book.id
      ? this.bookService.put(this.book.id, data)
      : this.bookService.post(data);

    obs.subscribe((resp) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Livro salvo com sucesso`,
        showConfirmButton: false,
        timer: 1500,
      });
      this.formBooks.reset();
      this.dialogRef.close();
    });
  }
}
