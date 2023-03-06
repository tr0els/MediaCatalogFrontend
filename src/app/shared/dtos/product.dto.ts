import { ImageDto } from "./image.dto";

export interface ProductDto {
    id?: number;
    name: string;
    images: ImageDto[];
  }