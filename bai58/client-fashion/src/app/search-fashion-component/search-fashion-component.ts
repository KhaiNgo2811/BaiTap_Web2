import { Component, signal } from '@angular/core';
import { FashionAPIService } from '../../service/fashion-apiservice';
import { IFashion } from '../classes/Fashion';

@Component({
  selector: 'app-search-fashion-component',
  standalone: false,
  templateUrl: './search-fashion-component.html',
  styleUrl: './search-fashion-component.css',
})
export class SearchFashionComponent {
  fashions = signal<IFashion[]>([]);
  errMessage = signal('');
  searched = signal(false);

  keyword = '';
  field = 'fashion_subject';
  measure = 'jaccard';
  limit = 5;
  limits = [3, 5, 10, 20];

  // Độ đo đã dùng ở lần tìm gần nhất (để tiêu đề cột không đổi khi chưa bấm tìm)
  usedMeasure = signal('jaccard');

  constructor(private _service: FashionAPIService) {}

  search() {
    this.errMessage.set('');
    const measure = this.measure;
    this._service.searchFashions(this.keyword, this.field, this.limit, measure).subscribe({
      next: (data) => {
        this.fashions.set(data);
        this.usedMeasure.set(measure);
        this.searched.set(true);
      },
      error: (err) => { this.errMessage.set(err.message); }
    });
  }

  // [0.75 -> 1] nền vàng + chữ đỏ, [0.5 -> 0.75) nền hồng + chữ xanh, < 0.5 nền đỏ + chữ trắng
  rowClass(s: number): string {
    if (s >= 0.75) return 'row-high';
    if (s >= 0.5) return 'row-mid';
    return 'row-low';
  }
}
