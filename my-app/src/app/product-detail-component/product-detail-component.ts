import { Component, OnInit, signal } from '@angular/core';
import { ProductHttpHandleErrorService } from '../../service/product-http-handle-error-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../classes/IProducts';

@Component({
  selector: 'app-product-detail-component',
  standalone: false,
  styleUrl: './product-detail-component.css',
  templateUrl: './product-detail-component.html',
})
export class ProductDetailComponent implements OnInit {
  product = signal<Product | null>(null);
  error = signal("");

  constructor(
    private _private: ProductHttpHandleErrorService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let idParam = params.get('id');
      if (idParam != null) {
        let id = parseInt(idParam);
        this._private.getProductById(id).subscribe({
          next: (data) => {
            this.product.set(data ?? null);
          },
          error: (err) => {
            this.error.set(err.message);
          }
        });
      } else {
        this.error.set("Invalid product ID");
      }
    });
  }
}
