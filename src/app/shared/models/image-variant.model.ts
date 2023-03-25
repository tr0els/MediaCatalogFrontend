import { Catalog } from "./catalog.model";
import { Image } from "./image.model";

export interface ImageVariant {
    id?: number,
    name: string,
    width: number,
    height: number,
    imageId?: number,
    image?: Image,
    catalogId?: number,
    catalog?: Catalog,
  }