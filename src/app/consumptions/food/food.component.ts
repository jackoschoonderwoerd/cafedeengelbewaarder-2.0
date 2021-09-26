import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import * as fromApp from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Course, FoodItem } from '../models/food-item.model';

import { OpeningHours } from 'src/app/shared/opening-hours.model';

import { SnacksService } from './services/snacks.service';
import { LunchService } from './services/lunch.service';
import { DinnerService } from './services/dinner-service';
import { FoodService } from './food.service';
import { MatDialog } from '@angular/material/dialog';
import { AddFoodComponent } from './add-food/add-food.component';
import { UIService } from 'src/app/shared/ui.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';



@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: [
    // './../../shared/food.css',
    './food.component.scss'
  ]
})
export class FoodComponent implements OnInit {

  mainMeats: FoodItem[] = [];
  mainFishes: FoodItem[] = [];
  starters: FoodItem[] = [];
  mainVegetarians: FoodItem[] = [];
  sides: FoodItem[] = [];
  courses: Course[] = [];
  openingHours: OpeningHours

  language: string = 'dutch';
  linkSelected: string;
  drinks$: Observable<any>
  starters$: Observable<any[]>
  meats$: Observable<FoodItem[]>
  fishes$: Observable<FoodItem[]>
  vegas$: Observable<FoodItem[]>;
  desserts$: Observable<FoodItem[]>;
  faTrash = faTrash;
  isAuthenticated$: Observable<boolean>
  
  
  constructor(
    private lunchService: LunchService,
    private dinnerService: DinnerService,
    private snackService: SnacksService,
    private store: Store<fromApp.GlobalState>,
    private foodService: FoodService,
    private dialog: MatDialog,
    private uiService: UIService,
    
  ) { }



  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(fromApp.getIsAuth);
    this.starters$ = this.foodService.getFoodCategory('starter');
    this.meats$ = this.foodService.getFoodCategory('meats');
    this.fishes$ = this.foodService.getFoodCategory('fishes');
    this.vegas$ = this.foodService.getFoodCategory('vegas');
    this.desserts$ = this.foodService.getFoodCategory('desserts');
    // this.foodService.getFoodCategory('starter')
    this.store.select(fromApp.getSelectedLanguage).subscribe((language: string) => {
      this.language = language
    });
    this.store.select(fromApp.getOpeningHours).subscribe((openingHours: OpeningHours) => {
      this.openingHours = openingHours
    })
    this.store.subscribe(storeContent => {
      if(storeContent.ui.selectedLink === 'lunch') {
        this.linkSelected = 'lunch'
        // this.courses = this.lunchService.fetchCourses();    
      } else if (storeContent.ui.selectedLink === 'snacks') {
        this.linkSelected = 'snacks'
        // this.courses = this.snackService.fetchCourses();
      } else if (storeContent.ui.selectedLink === 'food') {
        this.linkSelected = 'food'
        // this.courses = this.dinnerService.fetchCourses();
      }
    })
  }

  onAddFoodItem(courseName) {
    // console.log(courseName)
    // if(courseName) {
    //   const dialogRef =  this.dialog.open(AddFoodComponent, {
    //     data: {
    //       courseName: courseName, 
    //       section: this.linkSelected
    //     },
    //     minWidth: '450px'
        
    //   });
    //   dialogRef.afterClosed().subscribe((foodItem: FoodItem) => {
    //     if(!foodItem) {
    //       this.uiService.addingFailed('')
    //     } else {
    //       console.log(foodItem);
    //       this.foodService.addFoodItem(foodItem)
    //         .then(res => {
    //           this.uiService.addingSucceeded(foodItem.nameEnglish)
    //         })
    //         .catch(err => console.log(err));
    //     }
    //   })
    // }
  }
  onEditFoodItem(foodItem: FoodItem) {
    // const dialogRef =  this.dialog.open(AddFoodComponent, {
    //   data: {
    //     foodItem: foodItem
    //   },
    //   minWidth: '450px'
    // });
    // dialogRef.afterClosed().subscribe((foodItem: FoodItem) => {
    //   console.log(foodItem)
    //   if(!foodItem) {
    //     this.uiService.editingFailed('')
    //   } else {
    //     console.log(foodItem);
    //     this.foodService.editFoodItem(foodItem)
    //       .then(res => {
    //         this.uiService.editingSucceeded(foodItem.nameEnglish)
    //       })
    //       .catch(err => {
    //         console.log(err);
    //         this.uiService.editingFailed(foodItem.nameEnglish);
    //       })
    //   }
    // })
  }
  onDelete(event, starter: FoodItem) {
    // event.stopPropagation();
    // const dialogRef = this.dialog.open(ConfirmDeleteComponent);
    // dialogRef.afterClosed().subscribe((confirmation: string) => {
    //   console.log(confirmation);
    //   if(confirmation !== 'confirmed') {
    //     this.uiService.deletingFailed('')
    //   } else {
    //     console.log(starter);
    //     if(!starter) {
    //       this.uiService.deletingFailed('')
    //     } else {
    //       this.foodService.deleteFoodItem(starter)
    //         .then(res => {
    //           this.uiService.deletingSucceeded(starter.nameEnglish);
    //         })
    //         .catch(err => {
    //           console.log(err);
    //           this.uiService.deletingSucceeded(starter.nameEnglish);
    //         })
    //     }
    //   }
    // })
  }
}
