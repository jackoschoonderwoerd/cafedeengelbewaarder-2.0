import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OpeningHours } from 'src/app/shared/opening-hours.model';
import { Course, FoodItem, MealType } from '../../models/food-item.model';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'


import { Store } from '@ngrx/store';

import { FoodService } from '../food.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UIService } from 'src/app/shared/ui.service';
import * as fromApp from '../../../app.reducer';
import { AddFoodComponent } from '../add-food/add-food.component';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { AddCourseComponent } from '../add-course/add-course.component';

@Component({
  selector: 'app-dinner',
  templateUrl: './dinner.component.html',
  styleUrls: ['./dinner.component.scss']
})
export class DinnerComponent implements OnInit {

  
  openingHours: OpeningHours

  language: string = 'dutch';
  linkSelected: string;
  drinks$: Observable<any>
  starters$: Observable<any[]>
  meats$: Observable<FoodItem[]>
  fishes$: Observable<FoodItem[]>
  vegas$: Observable<FoodItem[]>;
  desserts$: Observable<FoodItem[]>;
  sides$: Observable<FoodItem[]>;
  faTrash = faTrash;
  faEdit = faEdit;
  isAuthenticated$: Observable<boolean>;
  dinner: MealType;
  // dinner$: Observable<any>
  allFood: MealType[];
  mealType: string = 'dinner'
  newDinner$: Observable<any>


  constructor(
    private store: Store<fromApp.GlobalState>,
    private foodService: FoodService,
    private dialog: MatDialog,
    private uiService: UIService,
  ) { }

  ngOnInit(): void {
    // this.foodService.fetchDinnerValueChanges()
    this.foodService.initializeDinner();
    this.newDinner$ = this.foodService.fetchNewDinnerSnapshotChanges()
    this.foodService.fetchNewDinnerSnapshotChanges()
    this.isAuthenticated$ = this.store.select(fromApp.getIsAuth);
    // this.foodService.fetchNewDinnerSnapshotChanges()

    this.foodService.fetchDinnerSnapshotChangesForLocalUse();    
    
    this.store.select(fromApp.getSelectedLanguage).subscribe((language: string) => {
      this.language = language
    });
    this.store.select(fromApp.getOpeningHours).subscribe((openingHours: OpeningHours) => {
      this.openingHours = openingHours
    })
  }

  onAddCourse(mealTypeName) {
    const dialogRef = this.dialog.open(AddCourseComponent, {
      data: {
        mealTypeName: mealTypeName,
      },
      width: '300px'
    })
    dialogRef.afterClosed().subscribe((course: Course) => {
      if(course) {
        console.log(course);
        course.foodItems = [];
        this.foodService.addCourse('dinner', course);
      }
      return
    })
  }

  onEditCourse(
    courseId, 
    courseNameDutch, 
    courseNameEnglish,
    remarkDutch,
    remarkEnglish, 
    listPosition) {
    const dialogRef = this.dialog.open(AddCourseComponent, {
      data: {
        courseId,
        courseNameDutch,
        courseNameEnglish,
        remarkDutch,
        remarkEnglish,
        listPosition
      }
    })
    dialogRef.afterClosed().subscribe((course: Course) => {
      course.id = courseId
      this.foodService.editCourse(course);
    })
  }

  onDeleteCourse(dinnerName, courseId) {
    const dialogRef =  this.dialog.open(ConfirmDeleteComponent);
    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.foodService.deleteCourse(dinnerName, courseId);
      }
      return
    })
  }

  

  onAddFoodItem(dinnerName, courseId, courseNameDutch, courseNameEnglish) {
    console.log(dinnerName, courseId, courseNameDutch, courseNameEnglish)
    if(courseId) {
      const dialogRef =  this.dialog.open(AddFoodComponent, {
        data: {
          courseId: courseId,
          courseNameDutch: courseNameDutch,
          courseNameEnglish: courseNameEnglish, 
        },
        minWidth: '350px'
      });
      dialogRef.afterClosed().subscribe((foodItem: FoodItem) => {
        if(!foodItem) {
          this.uiService.addingFailed('')
        } else {
          console.log(foodItem);
          this.foodService.addFoodItem(dinnerName, courseId, foodItem)
        }
      })
    }
  }

  onDeleteFoodItem(dinnerName, courseId, foodItemId) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent)
    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.foodService.deleteFoodItem(dinnerName, courseId, foodItemId)
      }
      return
    })
  }
  onEditFoodItem(mealTypeName, courseId, foodItem) {
    console.log(mealTypeName, courseId, foodItem)
    const dialogRef = this.dialog.open(AddFoodComponent, {
      data: {
        foodItem: foodItem
      }
    });
    dialogRef.afterClosed().subscribe((foodItem: FoodItem) => {
      if(foodItem) {
        console.log(foodItem);
        this.foodService.editFoodItem(mealTypeName, courseId, foodItem)
      }
      return
    })
  }
}
