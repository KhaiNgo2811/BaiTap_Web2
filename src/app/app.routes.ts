import { Routes } from '@angular/router';
import { ServiceProductImageEvent } from './bai13/service-product-image-event/service-product-image-event';
import { ServiceProductImageEventDetail } from './bai13/service-product-image-event-detail/service-product-image-event-detail';
import { CatalogView } from './bai14/catalog-view/catalog-view';
import { CustomerList } from './bai18/customer-list/customer-list';

export const routes: Routes = [
  { path: 'service-product-image-event', component: ServiceProductImageEvent },
  { path: 'service-product-image-event/:id', component: ServiceProductImageEventDetail },
  { path: 'catalog-view', component: CatalogView },
  { path: 'customer-list', component: CustomerList },
];
