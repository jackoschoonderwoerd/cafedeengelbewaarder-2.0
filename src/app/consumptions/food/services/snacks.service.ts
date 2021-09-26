import { Injectable } from '@angular/core';
import { Course } from '../../models/food-item.model';


@Injectable({
  providedIn: 'root'
})
export class SnacksService {

  courses: Course[] = [
    {
      name: {
        dutch: null,
        english: null
      },
      foodItems: [
        {
          section: '',
          category: '',
          nameDutch: 'Nootjes',
          nameEnglish: 'Nuts',
          price: 3.5,
          vegetarian: true,
          amount: null,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Olijven',
          nameEnglish: 'Olives',
          price: 4,
          vegetarian: true,
          amount: null,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Kaasblokjes',
          nameEnglish: 'Cheese Blocks',
          price: 5.5,
          vegetarian: true,
          amount: null,
          listPosition: 1,
          course: ''
        },
      ] 
    },
    {
      name: {
        dutch: 'snacks van oma bobs',
        english: 'snacks from oma bobs'
      },
      foodItems: [
        {
          section: '',
          category: '',
          nameDutch: 'Bitterballen',
          nameEnglish: 'Bitterballen',
          price: 6,
          vegetarian: false,
          amount: 6,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Bekbrandertjes',
          nameEnglish: 'Bekbrandertjes',
          price: 7.5,
          vegetarian: false,
          amount: 8,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Kaas Bitterballen',
          nameEnglish: 'Cheese Bitterballen',
          price: 6,
          vegetarian: true,
          amount: 6,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Bospaddestoelen croquetten',
          nameEnglish: 'Mushroom Croquettes',
          price: 7.5,
          vegetarian: true,
          amount: 6,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Kaasrolletjes',
          nameEnglish: 'Cheese Sticks',
          price: 7,
          vegetarian: true,
          amount: 8,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Mini Loempia\'s',
          nameEnglish: 'Mini Springrolls',
          price: 6,
          vegetarian: true,
          amount: 8,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Gemengde bittergarnituur warme snacks',
          nameEnglish: 'Mixed platter of fried snacks',
          price: 13.5,
          vegetarian: false,
          amount: 16,
          listPosition: 1,
          course: ''
        },
      ]
    },
    {
      name: {
        dutch: null,
        english: null
      },
      foodItems: [
        {
          section: '',
          category: '',
          nameDutch: 'Calamari',
          nameEnglish: 'Calamari',
          price: 6,
          vegetarian: false,
          amount: null,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Brood met humus of aioli',
          nameEnglish: 'Bread with Humus of Aioli',
          price: 6,
          vegetarian: true,
          amount: null,
          listPosition: 1,
          course: ''
        },
        {
          section: '',
          category: '',
          nameDutch: 'Soep van de dag',
          nameEnglish: 'Soup of the day',
          price: 6.5,
          vegetarian: true,
          amount: null,
          listPosition: 1,
          course: ''
        },
      ]
    },
    {
      name: {
        dutch: null,
        english: null
      },
      foodItems: [
        {
          section: '',
          category: '',
          nameDutch: 'Appeltaart',
          nameEnglish: 'Apple Pie',
          price: 4.5,
          vegetarian: true,
          amount: null,
          listPosition: 1,
          course: ''
        },
      ]
    }
  ]


  constructor() { }

  fetchCourses() {
    return this.courses;
  }
}
