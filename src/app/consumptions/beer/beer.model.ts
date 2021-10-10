
export interface BeerArray {
  beerArray: Beer[]
}

export interface Beer {
  id: string
  name: string,
  price: number
  content: number;
  percentage: number;
  draught: boolean;
  // listPosition?: number;
  descriptionDutch?: string;
  descriptionEnglish?: string;
}

