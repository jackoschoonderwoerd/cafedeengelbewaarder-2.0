// export interface Dinner {
//   newCourses: newCourse[] // starters /meat
// }
export interface MealType { // dinner lunch snacks
  courses: NewCourse[],
  name: string,
  id?: any
} 

export interface NewCourse { // meat fish omabob
  foodItems: NewFoodItem[],
  name: string,
  id: any,
}
export interface NewFoodItem { // steak nuts
  nameDutch: string,
  price: number,
  ingredients?: string,
  id?: string
}

export interface Course { 
  name: Name    // meats / starters
  foodItems: FoodItem[]; // steak / chicken
  remarks?: Remark // free range
}

export interface FoodItem {
  nameDutch: string,
  price: number;
  ingredientsDutch?: string;
  id?: string;
  section?: string;
  category?: string;
  nameEnglish?: string;
  listPosition?: number;
  course?: string;
  ingredientsEnglish?: string
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



