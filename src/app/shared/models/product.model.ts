import { Image } from "./image.model";

export interface Product {
    id?: number;
    name: string;
    sku: string;
    images?: Image[];
  }