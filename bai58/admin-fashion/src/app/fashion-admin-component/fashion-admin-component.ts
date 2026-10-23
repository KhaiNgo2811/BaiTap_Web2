import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fashion } from '../classes/Fashion';
import { IFashion } from '../classes/Fashion';
import { FashionAPIService } from '../../service/fashion-apiservice';

@Component({
  selector: 'app-fashion-admin',
  standalone: false,
  templateUrl: './fashion-admin-component.html',
  styleUrl: './fashion-admin-component.css',
})
export class FashionAdminComponent {
  fashions: IFashion[] = [];
  fashion = new Fashion();
  editing = false;
  loading = false;
  message = '';
  error = '';

  constructor(public service: FashionAPIService, route: ActivatedRoute) {
    this.load();
    route.queryParamMap.subscribe(params => {
      if (params.get('form') === '1') this.newFashion();
    });
  }

  load() {
    this.loading = true;
    this.service.getFashionsLite(100, 'created_desc').subscribe({
      next: data => { this.fashions = data; this.loading = false; },
      error: err => { this.error = err.message; this.loading = false; }
    });
  }

  newFashion() {
    this.fashion = new Fashion();
    this.editing = true;
    this.message = '';
    this.error = '';
  }

  edit(id: string) {
    this.service.getFashionDetailLite(id).subscribe({
      next: data => {
        this.fashion = new Fashion(data._id, data.style, data.fashion_subject,
          data.fashion_detail, data.fashion_image || '', data.IdF || 0);
        this.editing = true;
      },
      error: err => this.error = err.message
    });
  }

  cancel() {
    this.editing = false;
    this.fashion = new Fashion();
  }

  save() {
    const request = this.fashion._id
      ? this.service.putFashion(this.fashion)
      : this.service.postFashion(this.fashion);
    request.subscribe({
      next: () => { this.message = 'Đã lưu Fashion'; this.editing = false; this.load(); },
      error: err => this.error = err.message
    });
  }

  remove(id: string) {
    if (!confirm('Bạn có chắc muốn xóa Fashion này không?')) return;
    this.service.deleteFashion(id).subscribe({
      next: () => { this.message = 'Đã xóa Fashion'; this.load(); },
      error: err => this.error = err.message
    });
  }

  format(command: string, value?: string) {
    document.execCommand(command, false, value);
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => this.fashion.fashion_image = String(reader.result);
    reader.readAsDataURL(file);
  }
}
