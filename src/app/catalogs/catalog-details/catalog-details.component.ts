import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, Observable, switchMap, take } from 'rxjs';
import { Catalog } from 'src/app/shared/models/catalog.model';
import { Product } from 'src/app/shared/models/product.model';
import { CatalogService } from 'src/app/shared/services/catalog.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-catalog-details',
  templateUrl: './catalog-details.component.html',
  styleUrls: ['./catalog-details.component.scss']
})
export class CatalogDetailsComponent implements OnInit {
  error: any;
  catalog$?: Observable<Catalog>;
  products$?: Observable<Product[]>;
  catalogId?: number;

  constructor(
    private _catalogService: CatalogService,
    private _productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.catalog$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.catalogId = Number(params.get('id'));
        return this._catalogService.get(this.catalogId)
        .pipe(
          catchError(err => {
            this.error = err;
            throw err;
          })
        );
      })
    );

    this.products$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.catalogId = Number(params.get('id'));
        return this._catalogService.getAllInCatalog(this.catalogId)
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
