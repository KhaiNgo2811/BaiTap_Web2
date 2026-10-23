import { Component, signal } from '@angular/core';
import { Product } from '../classes/IProducts';
import { ProductHttpHandleErrorService } from '../../service/product-http-handle-error-service';
import { ActivatedRoute, Router } from '@angular/router';
import { createSlug } from '../classes/SlugHelper';

@Component({
  selector: 'app-product-list-advanced-component',
  standalone: false,
  styleUrl: './product-list-advanced-component.css',
  templateUrl: './product-list-advanced-component.html',
})
export class ProductListAdvancedComponent {
  products = signal<Product[]>([]);
  errorMessage = signal("")
  public generateSlug = createSlug;
  constructor(private _service: ProductHttpHandleErrorService,
    private router: Router, 
    private route: ActivatedRoute) {  
  }
  ngOnInit(): void {
    this._service.getProductList().subscribe({
      next: (data) => {
        this.products.set(data);
      },
      error: (err) => {
        console.log("Error occurred while fetching product list:", err);
        alert("Error occurred while fetching product list: " + err.message);
        this.errorMessage.set(err.message);
      }
    }
    );
  }
  viewDetails(productId: number): void {
    this.router.navigate(['/products', productId]);
  }
  viewDetailSlug(p:Product)
  {
    let slug=this.generateSlug(p.name,p.id)
    this.router.navigate(["/products",slug])
  }
}