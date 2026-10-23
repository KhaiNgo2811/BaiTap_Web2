import { Component, signal } from '@angular/core';
import { BookAPIService } from '../../service/book-apiservice';
import { IBook } from '../classes/Book';

@Component({
  selector: 'app-book-filter-component',
  standalone: false,
  templateUrl: './book-filter-component.html',
  styleUrl: './book-filter-component.css',
})
export class BookFilterComponent {
  books = signal<IBook[]>([]);
  errMessage = signal('');
  server_images_link = "http://localhost:3000/images/";

  constructor(private _service: BookAPIService) {}

  filter(min: string, max: string) {
    this.errMessage.set("");
    this._service.getBooksByPriceRange(parseFloat(min), parseFloat(max)).subscribe({
      next: (data) => { this.books.set(data); },
      error: (err) => { this.errMessage.set(err.message); }
    });
  }
}
