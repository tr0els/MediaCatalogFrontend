import { Component } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/shared/services/product.service';
import { Observable, catchError } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { UploadService } from 'src/app/shared/services/upload.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent {
  // form general
  error: any;
  submitted = false;

  // form product model
  model = {} as Product;

  // form image files
  selectedFiles?: FileList;
  previews: string[] = [];
  filenames: string[] = [];
  uploadstatus: boolean[] = [];
  urls: string[] = [];

  constructor(private productService: ProductService, private uploadService: UploadService) { }
  /*
  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }
  */

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
      .subscribe();
  }

  // Files for upload was selected
  selectFiles(event: any): void {

    // reset any current selection
    this.selectedFiles = event.target.files;
    this.previews = [];
    this.filenames = [];
    this.uploadstatus = [];
    this.urls = [];

    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);
        this.filenames.push(this.selectedFiles[i].name);
      }
    }
  }

  uploadFiles(): void {

    if (this.selectedFiles) {

      for (let i = 0; i < this.selectedFiles.length; i++) {
        let formData = new FormData();
        formData.append(this.selectedFiles[i].name, this.selectedFiles[i]);

        this.uploadService
          .upload(formData)
          .subscribe(image => (
            this.uploadstatus.push(true),
            this.urls.push(image.url)
          ));
      }
    }
  }
}