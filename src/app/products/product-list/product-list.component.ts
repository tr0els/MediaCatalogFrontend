import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from '../shared/product.service';

import { AsyncPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Country } from './country';
import { CountryService } from './country.service';
import { NgbdSortableHeader, SortEvent } from './sortable.directive';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [
		NgFor,
		DecimalPipe,
		FormsModule,
		AsyncPipe,
		NgbTypeaheadModule,
		NgbdSortableHeader,
		NgbPaginationModule,
		NgIf,
	],
  providers: [CountryService, DecimalPipe],

})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]> | undefined;
  error: any;
  countries$: Observable<Country[]>;
	total$: Observable<number>;

	@ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;

  constructor(private _productService: ProductService, public service: CountryService) {
    this.countries$ = service.countries$;
		this.total$ = service.total$;
  }

  ngOnInit(): void {
    this.products$ = this._productService.getAll()
      .pipe(
        catchError(err => {
          this.error = err;
          throw err;
        })
      );
  }


  onSort({ column, direction }: SortEvent) {
		// resetting other headers
		this.headers.forEach((header) => {
			if (header.sortable !== column) {
				header.direction = '';
			}
		});

		this.service.sortColumn = column;
		this.service.sortDirection = direction;
	}







}
