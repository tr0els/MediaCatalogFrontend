import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, Observable, pipe, switchMap } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { Image } from 'src/app/shared/models/image.model';
import { ProductService } from '../../shared/services/product.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AddToCatalogModal } from './add-to-catalog-modal/add-to-catalog-modal.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product$?: Observable<Product>;
  productId?: number;
  error: any;

  constructor(private productService: ProductService, 
    private modalService: NgbModal,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {

    this.product$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.productId = Number(params.get('id'));
        return this.productService.get(this.productId)
        .pipe(
          catchError(err => {
            this.error = err;
            throw err;
          })
        );
      })
    );
  }

  open(selectedImage: Image) {
    const modalRef = this.modalService.open(AddToCatalogModal);
    modalRef.componentInstance.selectedImage = selectedImage;
  }

}