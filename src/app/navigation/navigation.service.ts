import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  mealTypes: string[] = ['snacks', 'lunch', 'dinner']

  constructor() { }

  getMealTypes() {
    return this.mealTypes
  }
}

