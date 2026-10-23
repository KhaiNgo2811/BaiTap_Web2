import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FashionAPIService } from '../../service/fashion-apiservice';
import { Fashion, IFashion } from '../classes/Fashion';
import { createFashionSlug, extractIdFFromSlug } from '../classes/FashionSlugHelper';

@Component({
  selector: 'app-fashion-slug-component',
  standalone: false,
  templateUrl: './fashion-slug-component.html',
  styleUrl: './fashion-slug-component.css',
})
export class FashionSlugComponent implements OnInit {
  fashions = signal<IFashion[]>([]);
  fashion = signal<Fashion | null>(null);
  errMessage = signal('');
  loading = signal(false);
  selectedIdF = signal<number | null>(null);
  public generateSlug = createFashionSlug;

  constructor(
    private _service: FashionAPIService,
    private _router: Router,
    private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._service.getFashionsLite().subscribe({
      next: (data) => { this.fashions.set(data); },
      error: (err) => { this.errMessage.set(err.message); }
    });

    // Slug trên URL thay đổi -> tự phân tích và hiển thị đúng Fashion Detail
    this._route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug == null) {
        this.fashion.set(null);
        this.selectedIdF.set(null);
        return;
      }
      this.loadBySlug(slug);
    });
  }

  selectFashion(f: IFashion) {
    this._router.navigate(['/fashion-slug', this.generateSlug(f.fashion_subject, f.IdF)]);
  }

  private loadBySlug(slug: string) {
    this.errMessage.set('');
    this.fashion.set(null);
    const idF = extractIdFFromSlug(slug);
    if (idF == null) {
      this.selectedIdF.set(null);
      this.errMessage.set('Slug không hợp lệ: ' + slug);
      return;
    }
    this.selectedIdF.set(idF);
    this.loading.set(true);
    this._service.getFashion(String(idF)).subscribe({
      next: (data) => {
        this.fashion.set(Object.assign(new Fashion(), data));
        this.loading.set(false);
      },
      error: (err) => {
        this.errMessage.set('Không tìm thấy Fashion có IdF = ' + idF);
        this.loading.set(false);
      }
    });
  }
}
