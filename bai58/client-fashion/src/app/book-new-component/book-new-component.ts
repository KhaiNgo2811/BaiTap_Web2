import { Component, signal } from '@angular/core';
import { Book, IBook } from '../classes/Book';
import { BookAPIService } from '../../service/book-apiservice';

@Component({
  selector: 'app-book-new-component',
  standalone: false,
  templateUrl: './book-new-component.html',
  styleUrl: './book-new-component.css',
})
export class BookNewComponent {
  book = new Book();
  books = signal<IBook[]>([]);
  errMessage = signal('');
  server_images_link = "http://localhost:3000/images/";

  constructor(private _service: BookAPIService) {
    this._service.getBooks().subscribe({
      next: (data) => { this.books.set(data); },
      error: (err) => { this.errMessage.set(err.message); }
    });
  }

  postBook() {
    this._service.postBook(this.book).subscribe({
      next: (data) => { this.books.set(data); this.book = new Book(); },
      error: (err) => { this.errMessage.set(err.message); }
    });
  }

  // Xử lý chọn file ảnh
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.book.Image = file.name;
      const reader = new FileReader();
      reader.onload = (e: any) => { this.book.ImageBase64 = e.target.result; };
      reader.readAsDataURL(file);
    }
  }
}
