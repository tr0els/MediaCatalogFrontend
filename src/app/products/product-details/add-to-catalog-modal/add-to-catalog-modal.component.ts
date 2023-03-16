import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, Observable, pipe } from 'rxjs';
import { Image } from 'src/app/shared/models/image.model';
import { ProductService } from '../../../shared/services/product.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Catalog } from 'src/app/shared/models/catalog.model';
import { ImageVariant } from 'src/app/shared/models/image-variant.model';
import { ImageVariantService } from 'src/app/shared/services/image-variant.service';


@Component({
    selector: 'app-add-to-catalog-modal',
    templateUrl: './add-to-catalog-modal.component.html',
    styleUrls: ['./add-to-catalog-modal.component.scss']
})
export class AddToCatalogModal {
    constructor(public activeModal: NgbActiveModal, private imageVariantService: ImageVariantService) { }

    @Input() selectedImage?: Image;

    catalogs: Catalog[] = [
        { id: 1, name: 'Sikke et flot katalog' },
        { id: 2, name: 'Katalog over trøjer' },
        { id: 3, name: 'Produkter billeder til dig' },
        { id: 4, name: 'Bukser og trøjer' },
        { id: 5, name: 'Hvem ved hvad der er heri' },
        { id: 6, name: 'Samling af billeder' },
    ];

    selectedCatalog?: Catalog;

    resolutionOptions: any[] = [
        { id: 1, name: 'Original', width: '0', height: '0' },
        { id: 2, name: 'Stor', width: '1920', height: '6240' },
        { id: 3, name: 'Medium', width: '1280', height: '6240' },
        { id: 4, name: 'Lille', width: '640', height: '6240' },
    ];

    selectedResolutions?: any = [];

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