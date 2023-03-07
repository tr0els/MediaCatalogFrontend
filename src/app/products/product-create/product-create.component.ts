import { Component } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/products/shared/product.service';
import { Observable, catchError } from 'rxjs';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent {
  constructor(private productService: ProductService) {}
  error: any;
  model = {} as Product;
  submitted = false;

  onSubmit() { 
    this.submitted = true; 

    this.productService.create(this.model)
    .pipe(
      catchError(err => {
        this.error = err;
        throw err;
      })
    )
    .subscribe();
  }

  reset() {
    this.model = {} as Product;
  }
}