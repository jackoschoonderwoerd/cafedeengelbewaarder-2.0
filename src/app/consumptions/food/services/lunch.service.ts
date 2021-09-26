import { Injectable } from '@angular/core';
import { Course } from '../../models/food-item.model';


@Injectable({
  providedIn: 'root'
})
export class LunchService {

  courses: Course[] = [
    {
      name: {
        dutch: '2 zuurdesem boterhamen met:',
        english: '2 sourdough slices with:',
      },
      foodItems: [
        {
          section: '',
          category: '',
          nameDutch: 'Boerenkaas',
          nameEnglish: 'Farmhouse cheese',
          price: 6,
          ingredientsDutch: 'met grove mosterd en cornichons',
          ingredientsEnglish: 'with coarse mustard and cornichons',
          vegetarian: false,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Slagersachterham',
          nameEnglish: 'Butcher\'s ham',
          ingredientsDutch: 'met mosterdmayonaise en Amsterdamse ui',
          ingredientsEnglish: 'with mustard mayonnaise and Amsterdam onions',
          price: 6,
          vegetarian: false,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Twee kroketten van Oma Bobs',
          nameEnglish: 'Two croquettes from Oma Bobs',
          ingredientsDutch: 'met boter en grove mosterd',
          ingredientsEnglish: 'with butter and coarse mustard',
          price: 7.5,
          vegetarian: false,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Twee garnalenkroketten van Oma Bobs',
          nameEnglish: 'Two shrimp croquettes from Oma Bobs',
          ingredientsDutch: 'met boter en dragonmayonaise',
          ingredientsEnglish: 'with butter and tarragon mayonnaise',
          price: 11.5,
          vegetarian: false,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'BLT:',
          nameEnglish: 'BLT: ',
          ingredientsDutch: 'spek, sla en tomaat',
          ingredientsEnglish: 'bacon, lettuce and tomato',
          price: 7.5,
          vegetarian: false,
          listPosition: 1,
          course: ''
        },
      ]
    },
    {
      name: {
        dutch: 'eieren',
        english: 'eggs',
      },
      foodItems: [
        {
          section: '',
          category: '',
          nameDutch: 'Uitsmijter',
          nameEnglish: 'Fried eggs', 
          ingredientsDutch: 'met ham en/of kaas',
          ingredientsEnglish: 'with ham and/or cheese', 
          price: 7.5,
          vegetarian: false,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Omelet met ham en/of kaas',
          nameEnglish: 'Omelette with ham and/or cheese',
          ingredientsDutch: '',
          ingredientsEnglish:'',
          price: 7.5,
          vegetarian: false,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Roerei',
          nameEnglish: 'Scrambled eggs', 
          ingredientsDutch: 'met kaas en tomaat, op geroosterd brood',
          ingredientsEnglish:'with cheese and tomato, on toasted bread',
          price: 7.5,
          vegetarian: false,
          listPosition: 1,
          course: ''
        },
      ]
    },
    {
      name: {
        dutch: 'tosti\'s',
        english: 'toasties',
      },
      foodItems: [
        {
          section: '',
          category: '',
          nameDutch: 'Tosti',
          nameEnglish: 'Toastie ',
          ingredientsDutch: 'met ham en kaas',
          ingredientsEnglish:'with ham and cheese',
          price: 6,
          vegetarian: false,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Tosti ',
          nameEnglish: 'Toastie ',
          ingredientsDutch: 'met tomaat en kaas',
          ingredientsEnglish: 'with tomato and cheese',
          price: 6,
          vegetarian: false,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Hete tosti',
          nameEnglish: 'Spicy Toastie', 
          ingredientsDutch: 'met tomaat, kaas en jalapeños',
          ingredientsEnglish:'with tomato, cheese and jalapeños',
          price: 6.5,
          vegetarian: false,
          listPosition: 1,
          course: ''
        },
      ]
    },
    {
      name: {
        dutch: 'overig',
        english: 'other',
      },
      foodItems: [
        {
          section: '',
          category: '',
          nameDutch: 'Soep van de dag',
          nameEnglish: 'Soup of the Day', 
          ingredientsDutch: null,
          ingredientsEnglish: null,
          price: 6.5,
          vegetarian: false,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Black Angus hamburger',
          nameEnglish: 'Black Angus Hamburger',
          ingredientsDutch: 'met kaas, sla, tomaat, jalapeños, augurk, friet en coleslaw',
          ingredientsEnglish: 'with cheese, lettuce, tomato, jalapeños, pickle, fries and coleslaw', 
          price: 14.5,
          vegetarian: false,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Falafel',
          nameEnglish: 'Falafel', 
          ingredientsDutch: 'met tzatziki, hummus en coleslaw',
          ingredientsEnglish: 'with tzatziki, hummus and coleslaw',
          price: 14.5,
          vegetarian: false,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Biefstuk',
          nameEnglish: 'Steak', 
          ingredientsDutch: 'met kruidenboter, friet of brood en salade',
          ingredientsEnglish: 'with herb butter, fries or bread and salad',
          price: 20,
          vegetarian: false,
          listPosition: 1,
          course: ''
        },  
      ]
    },
    {
      name: {
        dutch: 'zoet',
        english: 'sweet',
      },
      foodItems: [
        {
          section: '',
          category: '',
          nameDutch: 'Appeltaart',
          nameEnglish: 'ApplePie',
          ingredientsDutch: null,
          ingredientsEnglish: null,
          price: 4.5,
          vegetarian: false,
          listPosition: 1,
          course: ''
        },
      ]
    }
  ]

  


  constructor() { }

  // getSandwiches() {
  //   return this.sandwiches;
  // }
  // getEggs() {
  //   return this.eggs;
  // }
  // getToasties() {
  //   return this.toasties
  // }
  // getOthers() {
  //   return this.others;
  // }
  // getSweets() {
  //   return this.sweets;
  // }
  fetchCourses() {
    return this.courses;
  }
}
