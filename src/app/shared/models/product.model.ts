import { Image } from "./image.model";

export interface Product {
    id?: number;
    name: string;
    images?: Image[];
  }