import { Component } from '@angular/core';
import { Product } from '../classes/IProducts';
import { ProductService } from '../../service/product-service';
import ps from '@angular/common/locales/extra/ps';

@Component({
  selector: 'app-product-list-call-service-component',
  standalone: false,
  styleUrl: './product-list-call-service-component.css',
  templateUrl: './product-list-call-service-component.html',
})
export class ProductListCallServiceComponent {
  products:Product[] = []
  minPrice: number = 0;
  maxPrice: number = 500;
  filteredProducts: Product[] = [];


  constructor(private ps: ProductService) {
  }
  ngOnInit():void {
    this.products = this.ps.getProductList();
  }

  doFilter() {
     this.products = this.ps.filterProductsList(this.minPrice, this.maxPrice);
  } 

} 
