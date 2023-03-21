import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { AsyncPipe } from '@angular/common';
import { AddToCatalogModal } from './products/product-details/add-to-catalog-modal/add-to-catalog-modal.component';
import { CatalogListComponent } from './catalogs/catalog-list/catalog-list.component';
import { CatalogDetailsComponent } from './catalogs/catalog-details/catalog-details.component';
import { CatalogProductComponent } from './catalogs/catalog-product/catalog-product.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductCreateComponent,
    ProductDetailsComponent,
    AddToCatalogModal,
    CatalogListComponent,
    CatalogDetailsComponent,
    CatalogProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ProductListComponent,
    AsyncPipe,
    NgbDropdownModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
