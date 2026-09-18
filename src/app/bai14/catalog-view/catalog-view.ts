import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalog } from '../../catalog';

@Component({
  imports: [CommonModule],
  selector: 'app-catalog-view',
  styleUrl: './catalog-view.css',
  templateUrl: './catalog-view.html',
})
export class CatalogView {
  public categories: any;

  constructor(cservice: Catalog) {
    this.categories = cservice.getCategories();
  }
}
