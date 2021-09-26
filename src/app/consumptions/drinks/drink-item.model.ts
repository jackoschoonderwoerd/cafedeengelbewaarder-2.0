export interface DbDrink {
  drinkId: string;
  nameDutch: string;
  nameEnglish: string;
  category: string;
  price: number;
  listPosition: number;
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