/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, OnInit, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { catchError, debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from './sortable.directive';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';

interface SearchResult {
	products: Product[];
	total: number;
}

interface State {
	page: number;
	pageSize: number;
	searchTerm: string;
	sortColumn: SortColumn;
	sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(products: Product[], column: SortColumn, direction: string): Product[] {
	if (direction === '' || column === '' || (column !== 'sku' && column !== 'name')) {
		return products;
	} else {
		return [...products].sort((a, b) => {
			const res = compare(a[column], b[column]);
			return direction === 'asc' ? res : -res;
		});
	}
}

function matches(product: Product, term: string, pipe: PipeTransform) {
	return (
		product.name.toLowerCase().includes(term.toLowerCase()) ||
		product.sku.toLowerCase().includes(term.toLowerCase())
		//pipe.transform(product.name).includes(term) ||
		//pipe.transform(product.sku).includes(term)
	);
}

@Injectable({ providedIn: 'root' })
export class SearchService {
	private _loading$ = new BehaviorSubject<boolean>(true);
	private _search$ = new Subject<void>();
	private myproducts: Product[] = [];
	private _products$ = new BehaviorSubject<Product[]>([]);
	private _total$ = new BehaviorSubject<number>(0);
	private error: any;

	private _state: State = {
		page: 1,
		pageSize: 10,
		searchTerm: '',
		sortColumn: '',
		sortDirection: '',
	};

	constructor(private pipe: DecimalPipe, private _productService: ProductService) {

		this._productService.getAll().subscribe(data => {
			this.myproducts = data;
			this._search$.next();
		  });

		this._search$
			.pipe(
				tap(() => this._loading$.next(true)),
				debounceTime(200),
				switchMap(() => this._search()),
				delay(200),
				tap(() => this._loading$.next(false)),
			)
			.subscribe((result) => {
				this._products$.next(result.products);
				this._total$.next(result.total);
			});

		this._search$.next();
	}

	get products$() {
		return this._products$.asObservable();
	}
	get total$() {
		return this._total$.asObservable();
	}
	get loading$() {
		return this._loading$.asObservable();
	}
	get page() {
		return this._state.page;
	}
	get pageSize() {
		return this._state.pageSize;
	}
	get searchTerm() {
		return this._state.searchTerm;
	}

	set page(page: number) {
		this._set({ page });
	}
	set pageSize(pageSize: number) {
		this._set({ pageSize });
	}
	set searchTerm(searchTerm: string) {
		this._set({ searchTerm });
	}
	set sortColumn(sortColumn: SortColumn) {
		this._set({ sortColumn });
	}
	set sortDirection(sortDirection: SortDirection) {
		this._set({ sortDirection });
	}

	private _set(patch: Partial<State>) {
		Object.assign(this._state, patch);
		this._search$.next();
	}

	private _search(): Observable<SearchResult> {
		const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

		// 1. sort
		let products = sort(this.myproducts, sortColumn, sortDirection);

		// 2. filter
		products = products.filter((products) => matches(products, searchTerm, this.pipe));
		const total = products.length;

		// 3. paginate
		products = products.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
		return of({ products, total });
	}
}