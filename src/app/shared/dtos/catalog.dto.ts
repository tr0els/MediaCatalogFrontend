import { ImageVariantDto } from "./image-variant.dto";

export interface CatalogDto {
    id?: number;
    name: string,
    imageVariants: ImageVariantDto[];
  }