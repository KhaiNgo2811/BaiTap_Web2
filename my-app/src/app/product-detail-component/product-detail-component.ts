import { Component, OnInit, signal } from '@angular/core';
import { ProductHttpHandleErrorService } from '../../service/product-http-handle-error-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../classes/IProducts';
import { extractIdFromSlug, getIdentityType } from '../classes/SlugHelper';

@Component({
  selector: 'app-product-detail-component',
  standalone: false,
  styleUrl: './product-detail-component.css',
  templateUrl: './product-detail-component.html',
})
export class ProductDetailComponent implements OnInit {
  product = signal<Product | null>(null);
  error = signal("");
  public checkIdentityType = getIdentityType;
  public extractIdFromSlug = extractIdFromSlug;

  constructor(
    private _private: ProductHttpHandleErrorService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (param) => {
        let idParam = param.get('id');
        if (idParam != null) {
          const type = this.checkIdentityType(idParam);
          let id: number = -1;
          switch (type) {
            case 'ID':
              // Trường hợp là số thuần túy (Ví dụ: product/1)
              id = parseInt(idParam);
              break;
            case 'SLUG_WITH_ID':
              // Trường hợp là Slug chuẩn SEO (Ví dụ: product/iphone-69-pro-max-p1)
              id = this.extractIdFromSlug(idParam) ?? -1;
              break;
            case 'PURE_SLUG':
              id = -1;
              break;
          }
          this._private.getProductById(id).subscribe({
            next: (data: Product | undefined) => {
              this.product.set(data ?? null);
            },
            error: (err: any) => {
              this.error.set(err.message);
            }
          });
        } else {
          this.error.set("Invalid product ID");
        }
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/product-list-advanced']);
  }
}
