import { Component, OnInit } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ProductDto } from 'src/app/shared/dtos/product.dto';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products$: Observable<ProductDto[]> | undefined;
  error: any;

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.products$ = this._productService.getAll()
      .pipe(
        catchError(err => {
          this.error = err;
          throw err;
        })
      );
  }
}
