import { Catalog } from "./catalog.model";
import { Image } from "./image.model";

export interface ImageVariant {
    id?: number;
    name: string,
    width: string,
    height: string,
    image: Image;
    catalog: Catalog;
  }