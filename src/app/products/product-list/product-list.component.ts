import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from '../../shared/services/product.service';
import { AsyncPipe, DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { NgbdSortableHeader, SortEvent } from './sortable.directive';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchService } from './search.service';
import { RouterModule } from '@angular/router';

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
    DatePipe,
    RouterModule
	],
  providers: [SearchService, DecimalPipe, DatePipe],

})
export class ProductListComponent implements OnInit {
  products$?: Observable<Product[]>;
  error: any;
	total$: Observable<number>;

	@ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;

  constructor(public service: SearchService) {
    this.products$ = service.products$;
		this.total$ = service.total$;
  }

  ngOnInit(): void {}

  onSort({ column, direction }: SortEvent) {
		this.headers.forEach((header) => {
			if (header.sortable !== column) {
				header.direction = '';
			}
		});

		this.service.sortColumn = column;
		this.service.sortDirection = direction;
	}
}
