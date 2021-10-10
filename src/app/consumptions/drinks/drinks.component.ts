import { Component, OnInit } from '@angular/core';
import { Drink, DrinkCategory, DrinkItem, WineItem } from './drink.model';
import { DrinksService } from './drinks.service';
import * as fromApp from './../../app.reducer';
import { Store } from '@ngrx/store';
import { OpeningHours } from 'src/app/shared/opening-hours.model';

import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faWineBottle } from '@fortawesome/free-solid-svg-icons'
import { faWineGlass } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

import { MatDialog } from '@angular/material/dialog';

import { AddDrinkComponent } from './add-drink/add-drink.component';
import { UIService } from 'src/app/shared/ui.service';
import { Observable } from 'rxjs';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { AddCategoryComponent } from './add-category/add-category.component';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {

  faCircle = faCircle;
  faWineGlass = faWineGlass;
  faWineBottle = faWineBottle;
  faTrash = faTrash;
  faEdit = faEdit;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  language: string = 'dutch';
  coffeeAndTeas: DrinkItem[] = [];
  softDrinks: DrinkItem[] = [];
  wines: WineItem[] = [];
  dutchSpirits: DrinkItem[] = [];
  foreignSpirits: DrinkItem[] = [];
  // beverageTypes: BeverageType[];
  openingHours: OpeningHours;

  drinks$: Observable<any>

  coffeeAndTea$: Observable<any>
  softDrinks$: Observable<any>
  wines$: Observable<any>
  dutchSpirits$: Observable<any>
  foreignSpirits$: Observable<any>
  
  categories: [];

  isAuthenticated$: Observable<any>


  constructor(
    // private drinksService: DrinksService,
    private store: Store<fromApp.GlobalState>,
    private dialog: MatDialog,
    private drinksService: DrinksService,
    private uiService: UIService,
    // private drinksService: DrinksService

  ) { }

  ngOnInit(): void {
    this.drinksService.initializeDrinks();
    this.drinksService.fetchDrinksForLocalUse();
    
    this.isAuthenticated$ = this.store.select(fromApp.getIsAuth)

    
    this.drinks$ = this.drinksService.fetchDrinks()

    this.store.select(fromApp.getSelectedLanguage).subscribe((language: string) => {
      this.language = language;
    })
    this.store.select(fromApp.getOpeningHours).subscribe((openingHours: OpeningHours) => {
      this.openingHours = openingHours
    })
  }

  onAddCategory () {
    const dialogRef = this.dialog.open(AddCategoryComponent)
    dialogRef.afterClosed().subscribe((drinkCategory: DrinkCategory) => {
      if(drinkCategory) {
        console.log(drinkCategory)
        this.drinksService.addCategory(drinkCategory)
      }
    })
  }

  onEditCategory(category: DrinkCategory) {
    console.log(category);
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      data: {
        category
      }
    })
    dialogRef.afterClosed().subscribe((updatedCategory: DrinkCategory) => {
      console.log(updatedCategory);
      updatedCategory.id = category.id;
      updatedCategory.drinks = category.drinks
      this.drinksService.editCategory(updatedCategory)
      
    })
  }

  onDeleteCategory(id: string) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);
    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.drinksService.deleteCategory(id);
      }
      return
    })
  }

  onMoveDrinkCategory(direction: string, categoryName: string) {
    this.drinksService.moveCategory(direction, categoryName)
  }

  onAddDrink(categoryId: string, categoryName: string) {
    console.log(categoryId, categoryName);
    const dialogRef = this.dialog.open(AddDrinkComponent, {
      data: {
        categoryName: categoryName
      },
      panelClass: 'dialog-dimensions'
    })
    dialogRef.afterClosed().subscribe((drink: Drink) => {
      if(drink) {
        drink.id = new Date().getTime().toString();
        this.drinksService.addDrink(categoryId, drink)
      }
      return
    })
  }

  onEditDrink(category: DrinkCategory, drink: Drink) {
    console.log(drink);
    const dialogRef =  this.dialog.open(AddDrinkComponent, {
      data: {
        drink: drink,
        category: category
      },
      panelClass: 'dialog-dimensions'
    })
    dialogRef.afterClosed().subscribe((drink: Drink) => {
      console.log(drink);
      this.drinksService.editDrink(category.id, drink)
    })
  }

  onDeleteDrink(categoryId: string, drinkId: string) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent)
    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.drinksService.deleteDrink(categoryId, drinkId);
      }
    })
    return
  }

  onMoveDrink(direction: string, categoryId: string, drinkId: string, index: number) {
    this.drinksService.moveDrink(direction,categoryId, drinkId, index)
    // if(direction === 'up') {
    //   if(index === 0) {
    //     console.log('at the top already')
    //     return 
    //   } else {
    //   }
    // } else if(direction === 'down') {
    //   console.log('going down')
    // }
  }
}
