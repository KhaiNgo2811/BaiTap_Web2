import { Component, OnInit, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FashionAPIService } from '../../service/fashion-apiservice';
import { IFashion } from '../classes/Fashion';
import { createFashionSlug, extractIdFFromSlug } from '../classes/FashionSlugHelper';

interface StyleGroup {
  style: string;
  items: IFashion[];
}

@Component({
  selector: 'app-bai58-component',
  standalone: false,
  templateUrl: './bai58-component.html',
  styleUrl: './bai58-component.css',
})
export class Bai58Component implements OnInit {
  fashions = signal<IFashion[]>([]);
  errMessage = signal('');
  loading = signal(true);

  // Tìm theo Style: nhập vào ô (gợi ý bằng datalist) hoặc chọn từ dropdown
  styleKeyword = signal('');

  // Chi tiết
  selected = signal<any | null>(null);
  detailLoading = signal(false);

  styles = computed(() => Array.from(new Set(this.fashions().map(f => f.Style))));

  groups = computed<StyleGroup[]>(() => {
    const kw = this.styleKeyword().trim().toLowerCase();
    const map = new Map<string, IFashion[]>();
    for (const f of this.fashions()) {
      if (kw && !f.Style.toLowerCase().includes(kw)) continue;
      if (!map.has(f.Style)) map.set(f.Style, []);
      map.get(f.Style)!.push(f);
    }
    return Array.from(map, ([style, items]) => ({ style, items }));
  });

  public generateSlug = createFashionSlug;

  constructor(
    public _service: FashionAPIService,
    private _router: Router,
    private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._service.getFashionsLite(100, 'created_desc').subscribe({
      next: (data) => { this.fashions.set(data); this.loading.set(false); },
      error: (err) => { this.errMessage.set(err.message); this.loading.set(false); }
    });

    // /bai58 -> danh sách; /bai58/:slug -> chi tiết (tự phân tích slug lấy IdF)
    this._route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug == null) { this.selected.set(null); return; }
      this.loadDetail(slug);
    });
  }

  open(f: IFashion) {
    this._router.navigate(['/bai58', this.generateSlug(f.fashion_subject, f.IdF)]);
  }

  back() {
    this._router.navigate(['/bai58']);
  }

  setStyle(value: string) {
    this.styleKeyword.set(value);
  }

  // fashion_detail có thể là HTML (nhập từ WYSIWYG) hoặc chữ thường -> luôn hiển thị được
  detailHtml(text: string): string {
    const t = text || '';
    if (/<[a-z][\s\S]*>/i.test(t)) return t;
    return t.split(/\n{2,}|\n/).filter(p => p.trim())
      .map(p => '<p>' + p.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</p>').join('');
  }

  private loadDetail(slug: string) {
    this.errMessage.set('');
    this.selected.set(null);
    const idF = extractIdFFromSlug(slug);
    if (idF == null) { this.errMessage.set('Đường dẫn không hợp lệ: ' + slug); return; }
    this.detailLoading.set(true);
    this._service.getFashionDetailLite(idF).subscribe({
      next: (data) => { this.selected.set(data); this.detailLoading.set(false); },
      error: () => {
        this.errMessage.set('Không tìm thấy Fashion có IdF = ' + idF);
        this.detailLoading.set(false);
      }
    });
  }
}
