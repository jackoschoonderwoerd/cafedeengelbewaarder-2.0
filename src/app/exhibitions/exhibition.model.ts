import { Slide } from "./slide.model";


export interface Exhibition {
  id: string;
  title: string;
  date: string;
  artistNames: string[];
  descriptionPath: string;
  slides?: Slide[];
  aspectRatio?: number;
  emailAddresses?: string[];
  websites?: string[]
}
