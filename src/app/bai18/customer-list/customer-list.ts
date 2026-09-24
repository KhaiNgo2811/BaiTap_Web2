import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../../customer';

@Component({
  imports: [CommonModule],
  selector: 'app-customer-list',
  styleUrl: './customer-list.css',
  templateUrl: './customer-list.html',
})
export class CustomerList {
  public customerTypes = signal<any[]>([]);

  constructor(cservice: Customer) {
    cservice.getCustomerTypes().subscribe((data: any) => {
      this.customerTypes.set(data);
    });
  }
}
