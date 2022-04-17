

export interface NewImage {
  orderNumber: number
  filePath: string;
  title?: string;
  artistName?: string;
  copyrightOwner?: string;
  price?: number
}


export interface NewExhibition {
  id?: string;
  title: string;
  startExhibition?: number;
  endExhibition?: number;
  artistNames: string[];
  description?: string;
  images?: NewImage[];
  emailAddress?: string;
  link?: string[]
}
