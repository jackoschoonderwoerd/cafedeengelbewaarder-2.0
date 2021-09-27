
export interface MealType { // dinner lunch snacks
  courses: Course[],
  name: string,
  id?: any
} 

export interface Course { // meat fish omabob
  nameDutch: string;
  nameEnglish: string;
  listPosition: number;
  foodItems: FoodItem[];
  remarkDutch?: string;
  remarkEnglish?: string;
  id?: any;
}

export interface FoodItem { // steak nuts
  nameDutch: string,
  ingredientsDutch: string;
  nameEnglish: string;
  ingredientsEnglish: string
  listPosition: number;
  price: number;
  id?: string;
  section?: string;
  category?: string;
  course?: string;
  vegetarian?: boolean;
  amount?: number;
}

export interface Remark {
  dutch: string;
  english: string
}

export interface Name {
  dutch: string,
  english: string
}



