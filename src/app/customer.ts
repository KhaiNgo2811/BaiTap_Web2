import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Service()
export class Customer {
  private http = inject(HttpClient);

  getCustomerTypes() {
    return this.http.get('/assets/data/customers.json');
  }
}
