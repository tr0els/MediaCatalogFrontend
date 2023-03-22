import { Component } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';
import { Image } from 'src/app/shared/models/image.model';
import { ImageNamesEnum } from 'src/app/shared/enums/image-names-enum';

import { UploadService } from 'src/app/shared/services/upload.service';
import { ImageService } from 'src/app/shared/services/image.service';
import { Observable, catchError } from 'rxjs';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent {
  // form for product
  error: any;
  submitted = false;
  model = {} as Product;
  ImageNamesEnum = ImageNamesEnum;

  selectedFiles?: FileList;
  previews: string[] = [];
  filenames: string[] = [];
  uploadStatus: boolean[] = [];
  imageNames: string[] = [];

  constructor(
    private productService: ProductService,
    private uploadService: UploadService,
    private imageService: ImageService) { }

  removeUpload(index: number): void {
    this.previews.splice(index, 1);
  }

  onSubmit() {
    this.submitted = true;
    this.productService.create(this.model)
      .pipe(
        catchError(err => {
          this.error = err;
          throw err;
        })
      )
      .subscribe(product => (
        this.model = product
      ))
  }

  // Files for upload was selected
  selectFiles(event: any): void {

    // reset any current selection
    this.selectedFiles = event.target.files;
    this.previews = [];
    this.filenames = [];
    this.uploadStatus = [];

    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews[i] = e.target.result;
        };

        this.filenames[i] = this.selectedFiles[i].name;
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  // Upload images, get returned data and create image objects
  uploadFiles() {
    if (this.selectedFiles && this.model.id && this.model.id > 0) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const formData = new FormData();
        formData.append(this.selectedFiles[i].name, this.selectedFiles[i]);

        this.uploadService.upload(formData)
          .pipe(
            catchError(err => {
              this.error = err;
              throw err;
            })
          )
          .subscribe(fileResult => (
            console.log("File uploaded successfully"),

            // persist image object
            this.createImage(fileResult, i)
          ));
      }
    }
  }

  createImage(fileResult: any, i: number) {
    if (this.model.id) {
      let image: Image = {
        productId: this.model.id,
        name: this.imageNames[i],
        url: fileResult.url,
        width: fileResult.width,
        height: fileResult.height
      }

      this.imageService.create(image)
        .pipe(
          catchError(err => {
            this.error = err;
            throw err;
          })
        )
        .subscribe(image => (
          this.uploadStatus[i] = true,
          console.log("Image persisted! index: " + i + " image: " + image.id + ":" + image.url)
        ));
    }
  }

  setImageName(i: number, name: string) {
    this.imageNames[i] = name;
    console.log("index:" + i + " name:" + this.imageNames[i]);
  }
}