import { Component, OnInit } from '@angular/core';
import { Observable, catchError, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';
import { Image } from 'src/app/shared/models/image.model';
import { CatalogService } from 'src/app/shared/services/catalog.service';
import { ImageVariant } from 'src/app/shared/models/image-variant.model';


@Component({
  selector: 'app-catalog-product',
  templateUrl: './catalog-product.component.html',
  styleUrls: ['./catalog-product.component.scss']
})
export class CatalogProductComponent implements OnInit {

  product$?: Observable<Product>;
  error: any;

  selectedImage?: Image;

  // Url parameters
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

  onSelectImage(image: Image) {
    this.selectedImage = image;
  }

  sortByResolution(a: ImageVariant, b: ImageVariant): number {
    if (a.width < b.width) return -1;
    if (a.width > b.width) return 1;
    return 0;
  }
}

