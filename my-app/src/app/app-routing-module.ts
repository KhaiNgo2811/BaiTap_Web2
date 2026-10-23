import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BindingClassComponent } from './binding-class-component/binding-class-component';
import { BindingPropertyComponent } from './binding-property-component/binding-property-component';
import { BindingStyleComponent } from './binding-style-component/binding-style-component';
import { BindingEventComponent } from './binding-event-component/binding-event-component';
import { BindingTwoWayComponent } from './binding-two-way-component/binding-two-way-component';
import { ProductListComponent } from './product-list-component/product-list-component';
import { ComponentInteraction } from './component-interaction/component-interaction';
import { ProductDropdownListComponent } from './product-dropdown-list-component/product-dropdown-list-component';
import { ProductListCallServiceComponent } from './product-list-call-service-component/product-list-call-service-component';
import { ProductListCallHttpServiceComponent } from './product-list-call-http-service-component/product-list-call-http-service-component';
import { ProductHttpHandleErrorServiceComponent } from './product-http-handle-error-service-component/product-http-handle-error-service-component';
import { ProductDetailComponent } from './product-detail-component/product-detail-component';
import { ProductListAdvancedComponent } from './product-list-advanced-component/product-list-advanced-component';
import { ProductListSearchComponent } from './product-list-search-component/product-list-search-component';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found-component';
import { Contact } from './contact/contact';
import { authGuard } from './classes/auth.guard';
import { CourseRegistrationComponent } from './course-registration-component/course-registration-component';
import { LoginComponent } from './login-component/login-component';
import { CourseRegistrationReactiveComponent } from './course-registration-reactive-component/course-registration-reactive-component';
import { FakeProductComponent } from './fake-product-component/fake-product-component';
import { FakeProduct2Component } from './fake-product2-component/fake-product2-component';
import { BooksComponent } from './books-component/books-component';
import { BookDetailComponent } from './book-detail-component/book-detail-component';
import { BookFilterComponent } from './book-filter-component/book-filter-component';
import { BookNewComponent } from './book-new-component/book-new-component';
import { BookUpdateComponent } from './book-update-component/book-update-component';
// import { BookDeleteComponent } from './book-delete-component/book-delete-component';
import { SearchFashionComponent } from './search-fashion-component/search-fashion-component';
import { FashionComponent } from './fashion-component/fashion-component';
import { FashionDetailComponent } from './fashion-detail-component/fashion-detail-component';
import { FashionSlugComponent } from './fashion-slug-component/fashion-slug-component';
import { FashionSimilarityComponent } from './fashion-similarity-component/fashion-similarity-component';
import { FashionNewComponent } from './fashion-new-component/fashion-new-component';
import { Bai58Component } from './bai58-component/bai58-component';
import { FashionUpdateComponent } from './fashion-update-component/fashion-update-component';
import { FashionDeleteComponent } from './fashion-delete-component/fashion-delete-component';
import { FashionAdminComponent } from './fashion-admin-component/fashion-admin-component';
const routes: Routes = [
  { path: 'binding-property', component: BindingPropertyComponent },
  { path: 'binding-class', component: BindingClassComponent },
  {path: 'binding-style', component: BindingStyleComponent},
  {path: 'binding-event', component: BindingEventComponent},
  {path: 'binding-twoway', component: BindingTwoWayComponent},
  {path: 'danh-sach-san-pham', component: ProductListComponent},
  {path: 'product-dropdown-list', component: ProductDropdownListComponent}, 
  {path: 'product-list-call-service', component: ProductListCallServiceComponent},
  {path: 'product-list-call-http-service', component: ProductListCallHttpServiceComponent},
  {path: 'product-http-handle-error-service', component: ProductHttpHandleErrorServiceComponent},
  {path: "products/:id", component: ProductDetailComponent},
  {path: "product-list-advanced", component: ProductListAdvancedComponent},
  {path: "search-products", component: ProductListSearchComponent},
  {
    path: 'samplenested',
    component: ProductListAdvancedComponent,
    children: [
      {path: 'search', component: ProductListSearchComponent},
      {path: 'detail/:id', component: ProductDetailComponent},
    ]
  },
  {path: "lazyinfo",
    loadComponent:()=>
      import('./lazy-component/lazy-component')
    .then(c=>c.LazyComponent),  
    canActivate: [authGuard]
  },
  {path: "course-registration", component: CourseRegistrationComponent},
  {path: "course-registration-reactive", component: CourseRegistrationReactiveComponent},
  {path: "contact", component: Contact},
  {path: "login", component: LoginComponent},
  {path: "fake-products", component: FakeProductComponent},
  {path: "fake-products2", component: FakeProduct2Component},
  {path: "books", component: BooksComponent},
  {path: "book-detail", component: BookDetailComponent},
  {path: "book-filter", component: BookFilterComponent},
  {path: "book-new", component: BookNewComponent},
  {path: "book-update", component: BookUpdateComponent},
  // {path: "book-delete", component: BookDeleteComponent},
  {path: "fashion-list", component: FashionComponent},
  {path: "fashion-detail", component: FashionDetailComponent},
  {path: "fashion-new-component", component: FashionNewComponent},
  {path: "fashion-update-component", component: FashionUpdateComponent},
  {path: "fashion-delete-component", component: FashionDeleteComponent},
  {path: "fashion-admin", component: FashionAdminComponent},
  {path: "fashion-detail", component: FashionDetailComponent},
  {path: "fashion-similarity", component: FashionSimilarityComponent},
  {path: "bai58", component: Bai58Component},
  {path: "bai58/:slug", component: Bai58Component},
  {path: "fashion-slug", component: FashionSlugComponent},
  {path: "fashion-slug/:slug", component: FashionSlugComponent},
  {path: "search-fashion", component: SearchFashionComponent},
  {path: "", component: Contact},
  {path: "**", component: PageNotFoundComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
