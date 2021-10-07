
export interface MealType { // dinner lunch snacks
  courses: Course[],
  name: string,
  id?: any
} 

export interface Course { // meat fish omabob
  nameDutch: string;
  nameEnglish: string;
  foodItems: FoodItem[];
  showCourseName: boolean;
  listPosition?: number;
  remarkDutch?: string;
  remarkEnglish?: string;
  id?: any;
}

export interface FoodItem { // steak nuts
  nameDutch: string,
  ingredientsDutch: string;
  nameEnglish: string;
  ingredientsEnglish: string
  price: number;
  listPosition?: number;
  id?: string;
  amount?: number;
  section?: string;
  category?: string;
  course?: string;
  vegetarian?: boolean;
}

export interface Remark {
  dutch: string;
  english: string
}

export interface Name {
  dutch: string,
  english: string
}



