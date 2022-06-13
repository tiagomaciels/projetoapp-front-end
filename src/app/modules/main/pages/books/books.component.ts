import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

import { Books } from './../../../shared/models/books';
import { BooksService } from './../../../shared/services/books.service';
import { ModalBooksComponent } from './modal-books/modal-books.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements AfterViewInit {
  displayedColumns: string[] = ['menu', 'title', 'description', 'release_date'];

  books: Books[] = [];
  dataBooks = new MatTableDataSource<Books>(this.books);

  @ViewChild('inputFilter') inputFilter: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private booksService: BooksService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.getBooks();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataBooks.filter = filterValue.trim().toLowerCase();
    this.dataBooks.filterPredicate = function (data, filter: string): boolean {
      return (
        data.title!.toLowerCase().includes(filter) ||
        data.description!.toLowerCase().includes(filter) ||
        data.release_date!.toLowerCase().includes(filter)
      );
    };
  }

  getBooks() {
    this.booksService.getAll().subscribe((resp) => {
      this.books = resp.books;
      this.dataBooks = new MatTableDataSource(this.books);
      this.dataBooks.sort = this.sort;
      this.dataBooks.paginator = this.paginator;
    });
    this.changeDetectorRefs.detectChanges();
  }

  deleteBook(id: string) {
    Swal.fire({
      title: 'Tem certeza que deseja excluir este livro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9C27B0',
      cancelButtonColor: '#F44336',
      confirmButtonText: 'Sim, excluir este livro!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.booksService.delete(id).subscribe(() => {
          this.ngAfterViewInit();
        });

        Swal.fire({
          position: 'top-end',
          title: 'Livro excluído!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });

  }

  openModalBooks(book: Books): void {
    const dialogRef = this.dialog.open(ModalBooksComponent, {
      width: '450px',
    });

    dialogRef.componentInstance.book = book;

    dialogRef.afterClosed().subscribe(() => {
      this.ngAfterViewInit();
      this.inputFilter.nativeElement.value = '';
    });
  }
}
