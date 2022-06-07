import { Books } from './../../../shared/models/books';
import { BooksService } from './../../../shared/services/books.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements AfterViewInit {
  displayedColumns: string[] = ['title', 'description', 'release_date'];
  books!: MatTableDataSource<Books>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private booksService: BooksService) {}

  ngAfterViewInit() {
    // this.books.paginator = this.paginator;
    // this.books.sort = this.sort;
    this.getBooks()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.books.filter = filterValue.trim().toLowerCase();

    if (this.books.paginator) {
      this.books.paginator.firstPage();
    }
  }

  getBooks() {
    this.booksService.getAll().subscribe(resp => {
      this.books = resp.books
    });
  }
}
