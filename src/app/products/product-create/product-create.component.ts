import { Component } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from 'src/app/products/shared/product.service';
import { Observable, catchError } from 'rxjs';
import { UploadService } from 'src/app/shared/services/upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

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
  filename = '';
  imageSource = '';
  imageUploadStatus = '';

  selectedFiles?: FileList;
  previews: string[] = [];


  constructor(private productService: ProductService, private uploadService: UploadService) { }
  /*
  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }
  */

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

  reset() {
    this.model = {} as Product;
  }

  setFilename(files: any) {
    if (files[0]) {
      this.filename = files[0].name;
    }
  }

  save(files: any) {
    const formData = new FormData();

    if (files[0]) {
      formData.append(files[0].name, files[0]);
    }

    this.uploadService
      .upload(formData)
      .subscribe(({ path }) => (this.imageSource = path, this.imageUploadStatus = "OK"));
  }




  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };
  
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  uploadFiles(): void {
  
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        //this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  }