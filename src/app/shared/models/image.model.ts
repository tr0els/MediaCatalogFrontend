import { ImageVariant } from "./image-variant.model";
import { Product } from "./product.model";

export interface Image {
    id?: number;
    productId: number;
    name: string,
    url: string,
    width: number,
    height: number,
    product: Product,
    imageVariants: ImageVariant[];
  }