import { Slide } from "./slide.model";

export interface Image {
  orderNumber: number
  filePath: string;
  title?: string;
  artistName?: string;
  copyrightOwner?: string;
  price?: number
}

export interface ImageAndIndex {
  image: Image;
  index: number;
}

export interface Exhibition {
  id?: string;
  title: string;
  startExhibition?: number;
  endExhibition?: number;
  date?: string;
  artistNames: string[];
  description?: string
  descriptionPath?: string;
  imageFilePaths?: string[];
  images?: Image[];
  slides?: Slide[];
  aspectRatio?: number;
  emailAddresses?: string[];
  websites?: string[]
}
