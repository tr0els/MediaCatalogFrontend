import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogDetailsComponent } from './catalogs/catalog-details/catalog-details.component';
import { CatalogListComponent } from './catalogs/catalog-list/catalog-list.component';
import { CatalogProductComponent } from './catalogs/catalog-product/catalog-product.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductListComponent } from './products/product-list/product-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'product/create', component: ProductCreateComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'catalogs', component: CatalogListComponent },
  { path: 'catalog/:id', component: CatalogDetailsComponent },
  { path: 'catalog/:id', component: CatalogDetailsComponent },
  { path: 'catalog/:catalogId/product/:productId', component: CatalogProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
