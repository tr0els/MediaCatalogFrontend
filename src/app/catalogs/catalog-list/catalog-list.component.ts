import { Component, OnInit } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Catalog } from 'src/app/shared/models/catalog.model';
import { CatalogService } from 'src/app/shared/services/catalog.service';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.scss']
})
export class CatalogListComponent implements OnInit {
  error: any;
  catalogs$?: Observable<Catalog[]>;

  constructor(private _catalogService: CatalogService) {}

  ngOnInit(): void {
    this.catalogs$ = this._catalogService.getAll()
      .pipe(
        catchError(err => {
          this.error = err;
          throw err;
        })
      );
  }
}
