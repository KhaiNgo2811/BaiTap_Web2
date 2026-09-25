import { Component } from '@angular/core';
import { Product } from '../classes/IProducts';

@Component({
  selector: 'app-product-list-component',
  standalone: false,
  styleUrl: './product-list-component.css',
  templateUrl: './product-list-component.html',
})
export class ProductListComponent {
  products:Product[] = [
    {id: 1, name: 'Iphone 18', price: 10.99, description: 'Description for Product 1', image: 'https://th.bing.com/th?id=OIF.rjoxTkZoRNdSt8W8iGZS%2bg&r=0&rs=1&pid=ImgDetMain&o=7&rm=3'},
    {id: 2, name: 'Samsung galaxy S21', price: -19.99, description: 'Description for Product 2', image: 'https://th.bing.com/th/id/OIP.H0Zn-f2ev7F4nBxoonJWrwHaJD?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3'},
    {id: 3, name: 'Macbook Pro', price: 5.99, description: 'Description for Product 3', image: 'https://th.bing.com/th/id/OIP.H0Zn-f2ev7F4nBxoonJWrwHaJD?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3', },
    {id: 4, name: 'Lenovo ThinkPad', price: -15.49, description: 'Description for Product 4', image: 'https://th.bing.com/th/id/OIP.H0Zn-f2ev7F4nBxoonJWrwHaJD?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3'},
    {id: 5, name: 'Product 5', price: 25.00, description: 'Description for Product 5', image: 'https://th.bing.com/th/id/OIP.H0Zn-f2ev7F4nBxoonJWrwHaJD?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3'},
  ];
}
