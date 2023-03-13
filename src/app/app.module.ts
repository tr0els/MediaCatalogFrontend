import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailsComponent } from './products/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductCreateComponent,
    ProductDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ProductListComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
