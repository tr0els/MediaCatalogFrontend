import { CatalogDto } from "./catalog.dto";
import { ImageDto } from "./image.dto";

export interface ImageVariantDto {
    id?: number;
    name: string,
    width: string,
    height: string,
    image: ImageDto;
    catalog: CatalogDto;
  }