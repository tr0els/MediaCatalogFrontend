import { ImageVariant } from "./image-variant.model";

export interface Catalog {
    id?: number;
    name: string,
    imageVariants?: ImageVariant[];
  }