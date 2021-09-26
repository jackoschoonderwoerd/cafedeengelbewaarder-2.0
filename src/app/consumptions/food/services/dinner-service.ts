import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Course } from '../../models/food-item.model';


@Injectable({
  providedIn: 'root'
})

export class DinnerService {

  constructor(
    private db: AngularFirestore
  ) { }  

  // getDrinks() {
  //   this.db.collection('drinks/categories/wine').snapshotChanges().subscribe(data => console.log(data))
  // }
  

  courses: Course[] = [
    {
      name: {
        dutch: 'voorgerechten',
        english: 'starters'
      },
      foodItems: [
        {
          section: 'dinner',
          category: 'starters',
          nameDutch: 'Salade watermeloen',
          nameEnglish: 'Watermelon salad',
          ingredientsDutch: 'gezouten ricotta, framboos en pistache',
          ingredientsEnglish: 'salted ricotta cheese, raspberry and pistachio',
          price: 8.5,
          vegetarian: false,
          listPosition: 1,
          course: ''
        },
        {
          section: 'dinner',
          category: 'starters',
          nameDutch: 'Gazpacho',
          nameEnglish: 'Gazpacho',
          ingredientsDutch: '',
          ingredientsEnglish: '',
          price: 6.5,
          vegetarian: false,
          listPosition: 1,
          course: ''
        },
        {
          section: 'dinner',
          category: 'starters',
          nameDutch: 'Artisjok',
          nameEnglish: 'Artichoke',
          ingredientsDutch: 'met bruine boter en mosterd vinaigrette',
          ingredientsEnglish: 'with brown butter and mustard vinaigrette',
          price: 7.5,
          vegetarian: false,
          listPosition: 1,
          course: ''
        },
        {
          section: 'dinner',
          category: 'starters',
          nameDutch: 'Camembert',
          nameEnglish: 'Camembert cheese',
          ingredientsDutch: 'met cider caramel', 
          ingredientsEnglish: 'with cider caramel',
          price: 7,
          vegetarian: false,
          listPosition: 1,
          course: ''
        }, 
        {
          section: 'dinner',
          category: 'starters',
          nameDutch: 'Soep van de dag',
          nameEnglish: 'Soup of the Day',
          ingredientsDutch: '',
          ingredientsEnglish: '',
          price: 6.5,
          vegetarian: false,
          listPosition: 1,
          course: ''
        },
      ],
     
    },
    {
      name: {
        dutch: 'vlees',
        english: 'meat'
      },
      foodItems: [
        {
          section: 'dinner',
          category: 'meat',
          nameDutch: 'Biefstuk',
          nameEnglish: 'Steak',
          ingredientsDutch: 'met kruidenboter, friet of brood en salade',
          ingredientsEnglish: 'with herb butter, fries or bread and salad',
          price: 20,
          vegetarian: false,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Black Angus hamburger',
          nameEnglish: 'Black Angus Hamburger',
          ingredientsDutch: 'kaas, sla, tomaat, jalapeños, augurk, friet en coleslaw',
          ingredientsEnglish: 'with cheese, lettuce, tomato, jalapeños, pickle, fries and coleslaw',
          price: 14.5,
          vegetarian: false,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Poussin',
          nameEnglish: 'Poussin',
          ingredientsDutch: 'snijbonenstamppotje en dragonjus',
          ingredientsEnglish: 'with string bean potato mash and tarragon jus',
          price: 17.5,
          vegetarian: false,
          listPosition: 1,
          course: ''
        },
      ],
      remarks: {
        dutch: 'Wij serveren scharrelvlees.',
        english: 'We serve free range meat.'
      } 
    },
    {
      name: {
        dutch: 'vis',
        english: 'fish'
      },
      foodItems: [
        {
          section: '',
          category: '',
          nameDutch: 'Gamba\’s ',
          nameEnglish: 'Garlic Gambas',
          ingredientsDutch: 'knoflook met chili, pernod, salade en friet of brood',
          ingredientsEnglish: 'with chili, Pernod, salad and fries or bread',
          price: 18.5,
          vegetarian: false,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Bouillabaisse',
          nameEnglish: 'Bouillabaisse',
          ingredientsDutch: 'met inktvis, mosselen, venkel, rouille en vis van de dag',
          ingredientsEnglish: 'with squid, mussels, fennel, rouille and fish of the day',
          price: 9.5,
          vegetarian: false,
          listPosition: 1,
          course: ''
        },
      ]
    },
    {
      name: {
        dutch: 'vegetarisch',
        english: 'vegetarian',
      },
      foodItems: [
        {
          section: '',
          category: '',
          nameDutch: 'Panzanella',
          nameEnglish: 'Panzanella',
          ingredientsDutch: 'italiaanse broodsalade met tomaat, basilicum, paprika en burrata',
          ingredientsEnglish: 'italian bread salad with tomato, basil, pepper and burrata',
          price: 12.5,
          vegetarian: true,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Falafel',
          nameEnglish: 'Falafel',
          ingredientsDutch: 'met tomatensalsa tzatziki, hummus en coleslaw',
          ingredientsEnglish: 'with tomato salsa, tzatziki, hummus and coleslaw',
          price: 14.5,
          vegetarian: true,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Risotto van het seizoen',
          nameEnglish: 'Seasonal Risotto',
          ingredientsDutch: '',
          ingredientsEnglish: '',
          price: 15.5,
          vegetarian: true,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Kaasfondue',
          nameEnglish: 'Cheese fondue',
          ingredientsDutch: 'met brood en salade (alleen binnen)',
          ingredientsEnglish: 'with bread and salad (inside only)',
          price: 17.5,
          vegetarian: true,
          listPosition: 1,
          course: ''
        },
      ]
    },
    {
      name: {
        dutch: 'bijgerechten',
        english: 'side dishes'
      },
      foodItems: [
        {
          section: '',
          category: '',
          nameDutch: 'Friet',
          nameEnglish: 'Fries',
          ingredientsDutch: 'met huisgemaakte mayo',
          ingredientsEnglish: 'with homemade mayonnaise',
          price: 3.5,
          vegetarian: true,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Salade',
          nameEnglish: 'Salad',
          ingredientsDutch: null,
          ingredientsEnglish: null,
          price: 4,
          vegetarian: true,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Coleslaw',
          nameEnglish: 'Coleslaw',
          ingredientsDutch: null,
          ingredientsEnglish: null,
          price: 4,
          vegetarian: true,
          listPosition: 1,
          course: ''
        },
      ] 
    }
  ]

 

  fetchCourses() {
    return this.courses;
  }
}
