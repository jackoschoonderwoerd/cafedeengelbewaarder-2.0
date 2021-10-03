export interface AllDrinks {
  categories: DrinkCategory[];
  id?: string
}

export interface DrinkCategory {
  nameDutch: string,
  nameEnglish: string
  drinks: Drink[] 
  listPosition: number,
  id: string;
}

export interface Drink {
  nameDutch: string;
  nameEnglish: string;
  price: number;
  listPosition: number;
  id?: string,
  comment?: string;
  wineType?: string;
  wineContainer?: string;
}



export interface Beverage {
  nameDutch: string;
  nameEnglish: string;
  color?: string;
  priceUnit?: number;
  priceBottle?: number;
  bottle?: boolean;
}

export interface BeverageType {
  nameDutch: string,
  nameEnglish: string,
  beverages: Beverage[]; 
}

export interface DrinkItem {
  nameDutch: string;
  nameEnglish: string;
  priceGlass: number;
  color?: string;
  priceBottle?: number;
  bottle?: boolean
}

export interface WineItem {
  nameDutch: string;
  nameEnglish: string;
  color: string;
  priceGlass: number;
  priceBottle: number;
  bottle: boolean;
}