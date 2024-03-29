import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, Observable, pipe } from 'rxjs';
import { Image } from 'src/app/shared/models/image.model';
import { Catalog } from 'src/app/shared/models/catalog.model';
import { ImageVariant } from 'src/app/shared/models/image-variant.model';
import { ImageVariantService } from 'src/app/shared/services/image-variant.service';
import { CatalogService } from 'src/app/shared/services/catalog.service';

@Component({
    selector: 'app-add-to-catalog-modal',
    templateUrl: './add-to-catalog-modal.component.html',
    styleUrls: ['./add-to-catalog-modal.component.scss']
})
export class AddToCatalogModal {
    constructor(public activeModal: NgbActiveModal, 
        private imageVariantService: ImageVariantService,
        private catalogService: CatalogService) { }

    @Input() selectedImage!: Image;
    
    error: any;
    catalogs$?: Observable<Catalog[]>;

    catalogsz: Catalog[] = [
        { id: 1, name: 'Sikke et flot katalog' },
        { id: 2, name: 'Katalog over trøjer' },
        { id: 3, name: 'Produkter billeder til dig' },
        { id: 4, name: 'Bukser og trøjer' },
        { id: 5, name: 'Hvem ved hvad der er heri' },
        { id: 6, name: 'Samling af billeder' },
    ];

    selectedCatalog?: Catalog;
    selectedResolutions: any = [];
    resolutionOptions: any = [];

    ngOnInit() {

        this.catalogs$ = this.catalogService.getAll()
        .pipe(
          catchError(err => {
            this.error = err;
            throw err;
          })
        );

        // height divided by rescale factor
        let orgWidth = this.selectedImage?.width;
        let orgHeight = this.selectedImage?.height;
        let height1920 = Math.round(orgHeight / (orgWidth / 1920));
        let height1280 = Math.round(orgHeight / (orgWidth / 1280));
        let height640 = Math.round(orgHeight / (orgWidth / 640));

        this.resolutionOptions = [
            { id: 1, name: 'Original', width: orgWidth, height: orgHeight },
            { id: 2, name: 'Stor', width: '1920', height: height1920 },
            { id: 3, name: 'Medium', width: '1280', height: height1280 },
            { id: 4, name: 'Lille', width: '640', height: height640 },
        ];
    }

    onSelectCatalog(catalog: Catalog): void {
        this.selectedCatalog = catalog;
    }

    onSelectResolution(resolution: any): void {
        const findIndex = this.selectedResolutions.findIndex((e: { id: number; }) => e.id === resolution.id)
        if (findIndex != -1) {
            this.selectedResolutions?.splice(findIndex, 1);
        } else {
            this.selectedResolutions?.push(resolution);
        }
    }

    isInSelectedResolutions(resolution: any): Boolean {
        return (this.selectedResolutions.findIndex((e: { id: number; }) => e.id === resolution.id) != -1);
    }

    onSubmitAddToCatalog() {
        this.selectedResolutions.forEach((resolution: { name: any; width: any; height: any; }) => {

            let imageVariant: ImageVariant = {
                name: resolution.name,
                width: resolution.width,
                height: resolution.height,
                imageId: this.selectedImage?.id,
                catalogId: this.selectedCatalog?.id
            }

            console.log("Calling ImageVariantService with object to be createded: ", imageVariant);

            this.imageVariantService.create(imageVariant).subscribe((response: ImageVariant) => {
                console.log("ImageVariant created: ", response);
            })
        });
    }
}