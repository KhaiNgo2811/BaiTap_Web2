import { Component, OnInit, signal } from '@angular/core';
import { FakeProductService } from '../../service/fake-product-service';
import { IFakeProduct } from '../classes/IFakeProduct';

@Component({
  selector: 'app-fake-product-component',
  standalone: false,
  styleUrl: './fake-product-component.css',
  templateUrl: './fake-product-component.html',
})
export class FakeProductComponent implements OnInit {
  products = signal<IFakeProduct[]>([]);
  errMessage = signal("");

  constructor(private _service: FakeProductService) {}

  ngOnInit(): void {
    this._service.getFakeProductData().subscribe({
      next: (data: IFakeProduct[]) => {
        this.products.set(data);
      },
      error: (err: any) => {
        this.errMessage.set(err.message);
      }
    });
  }
}
