import { Component, OnInit } from '@angular/core';
import { Observable, catchError, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';
import { Image } from 'src/app/shared/models/image.model';
import { CatalogService } from 'src/app/shared/services/catalog.service';


@Component({
  selector: 'app-catalog-product-details',
  templateUrl: './catalog-product-details.component.html',
  styleUrls: ['./catalog-product-details.component.scss']
})
export class CatalogProductDetailsComponent implements OnInit {

  product$?: Observable<Product>;
  error: any;

  catalogId?: number;
  productId?: number;

  constructor(
    private _productService: ProductService, 
    private _catalogService: CatalogService, 
    private route: ActivatedRoute
    ) { }

    ngOnInit() {

    this.product$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.catalogId = Number(params.get('catalogId'));
        this.productId = Number(params.get('productId'));
        return this._catalogService.getInCatalog(this.catalogId, this.productId)
        .pipe(
          catchError(err => {
            this.error = err;
            throw err;
          })
        );
      })
    );
  }

}

