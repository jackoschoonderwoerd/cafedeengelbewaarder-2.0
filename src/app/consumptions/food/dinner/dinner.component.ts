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
  
  allFood: MealType[];
  mealType: string = 'dinner'
  dinner$: Observable<any>


  constructor(
    private store: Store<fromApp.GlobalState>,
    private foodService: FoodService,
    private dialog: MatDialog,
    private uiService: UIService,
  ) { }

  ngOnInit(): void {
    this.foodService.checkForMealtypeDb(this.mealType);
    this.dinner$ = this.foodService.fetchMealTypeSnapshotChanges(this.mealType)
    this.isAuthenticated$ = this.store.select(fromApp.getIsAuth);

    this.foodService.fetchMealTypeSnapshotChangesForLocalUse(this.mealType);    
    
    this.store.select(fromApp.getSelectedLanguage).subscribe((language: string) => {
      this.language = language
    });
    this.store.select(fromApp.getOpeningHours).subscribe((openingHours: OpeningHours) => {
      this.openingHours = openingHours
    })
  }

  onSelectSnacks() {
    this.mealType = 'snacks';
    this.foodService.checkForMealtypeDb('snacks')
    this.dinner$ = this.foodService.fetchMealTypeSnapshotChanges(this.mealType)
  }
  onSelectLunch() {
    this.mealType = 'lunch';
    this.foodService.checkForMealtypeDb('lunch')
    this.dinner$ = this.foodService.fetchMealTypeSnapshotChanges(this.mealType)
  }
  onSelectDinner() {
    this.foodService.checkForMealtypeDb('dinner')
    this.mealType = 'dinner';
    this.dinner$ = this.foodService.fetchMealTypeSnapshotChanges(this.mealType)
  }

  onAddCourse() {
    const dialogRef = this.dialog.open(AddCourseComponent, {
      data: {
        mealType: this.mealType,
      },
      width: '300px'
    })
    dialogRef.afterClosed().subscribe((course: Course) => {
      if(course) {
        console.log(course);
        course.foodItems = [];
        this.foodService.addCourse(this.mealType, course);
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
      this.foodService.editCourse(this.mealType, course);
    })
  }

  onDeleteCourse(courseId) {
    console.log(courseId);
    const dialogRef =  this.dialog.open(ConfirmDeleteComponent);
    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.foodService.deleteCourse(this.mealType, courseId);
      }
      return
    })
  }

  onAddFoodItem(courseId, courseNameDutch, courseNameEnglish) {
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
          this.foodService.addFoodItem(this.mealType, courseId, foodItem)
        }
      })
    }
    return;
  }

  onDeleteFoodItem(courseId, foodItemId) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent)
    dialogRef.afterClosed().subscribe(data => {
      if(data) {
        this.foodService.deleteFoodItem(this.mealType, courseId, foodItemId)
      }
      return
    })
  }

  onEditFoodItem(courseId, foodItem) {  
    const dialogRef = this.dialog.open(AddFoodComponent, {
      data: {
        foodItem: foodItem
      }
    });
    dialogRef.afterClosed().subscribe((foodItem: FoodItem) => {
      if(foodItem) {
        console.log(foodItem);
        this.foodService.editFoodItem(this.mealType, courseId, foodItem)
      }
      return
    })
  }
}
