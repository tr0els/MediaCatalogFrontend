import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, Observable, pipe } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { Image } from 'src/app/shared/models/image.model';
import { ProductService } from '../../shared/services/product.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AddToCatalogModal } from './add-to-catalog-modal/add-to-catalog-modal.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product$?: Observable<Product>;
  error: any;

  constructor(private productService: ProductService, private modalService: NgbModal) { }

  ngOnInit(): void {
    /*
this.appService.getFoodsAsync().subscribe(response => {
  this.items = response;
})
*/


    this.product$ = this.productService.get(1)
      .pipe(
        catchError(err => {
          this.error = err;
          throw err;
        })
      );
  }


  open(selectedImage: Image) {
    const modalRef = this.modalService.open(AddToCatalogModal);
    modalRef.componentInstance.selectedImage = selectedImage;
  }

}