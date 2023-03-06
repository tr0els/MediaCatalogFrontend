import { ImageVariantDto } from "./image-variant.dto";
import { ProductDto } from "./product.dto";

export interface ImageDto {
    id?: number;
    productId: number;
    name: string,
    url: string,
    product: ProductDto,
    imageVariants: ImageVariantDto[];
  }