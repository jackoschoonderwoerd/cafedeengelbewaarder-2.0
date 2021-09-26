import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OpeningHours } from 'src/app/shared/opening-hours.model';
import { Course, FoodItem, MealType, NewFoodItem } from '../../models/food-item.model';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { LunchService } from '../services/lunch.service';
import { DinnerService } from '../services/dinner-service';
import { Store } from '@ngrx/store';
import { SnacksService } from '../services/snacks.service';
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
    this.foodService.fetchDinnerValueChanges()
    this.foodService.initializeDinner();
    this.newDinner$ = this.foodService.fetchNewDinnerSnapshotChanges()
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
    dialogRef.afterClosed().subscribe((data: any) => {
      console.log(data);
      this.foodService.addCourse('dinner', data.id, data.name);
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

  

  onAddFoodItem(dinnerName, courseId, courseName) {
    console.log(courseId)
    if(courseId) {
      const dialogRef =  this.dialog.open(AddFoodComponent, {
        data: {
          courseName: courseName, 
          section: this.linkSelected
        },
        minWidth: '450px'
        
      });
      dialogRef.afterClosed().subscribe((foodItem: FoodItem) => {
        if(!foodItem) {
          this.uiService.addingFailed('')
        } else {
          console.log(foodItem);
          // const newFoodItem: NewFoodItem = {
          //   price: foodItem.price,
          //   name: foodItem.nameEnglish,
          //   ingredients: foodItem.ingredientsEnglish
          // }
          this.foodService.addFoodItem(dinnerName, courseId, foodItem)
            // .then(res => {
            //   this.uiService.addingSucceeded(foodItem.nameEnglish)
            // })
            // .catch(err => console.log(err));
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
    dialogRef.afterClosed().subscribe((foodItem: NewFoodItem) => {
      console.log(foodItem);
      this.foodService.editFoodItem(mealTypeName, courseId, foodItem)
    })
  }

  // onEditFoodItem(foodItem: FoodItem) {
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
  // }
  // onDelete(event, starter: FoodItem) {
  //   event.stopPropagation();
  //   const dialogRef = this.dialog.open(ConfirmDeleteComponent);
  //   dialogRef.afterClosed().subscribe((confirmation: string) => {
  //     console.log(confirmation);
  //     if(confirmation !== 'confirmed') {
  //       this.uiService.deletingFailed('')
  //     } else {
  //       console.log(starter);
  //       if(!starter) {
  //         this.uiService.deletingFailed('')
  //       } else {
  //         this.foodService.deleteFoodItem(starter)
  //           .then(res => {
  //             this.uiService.deletingSucceeded(starter.nameEnglish);
  //           })
  //           .catch(err => {
  //             console.log(err);
  //             this.uiService.deletingSucceeded(starter.nameEnglish);
  //           })
  //       }
  //     }
  //   })
  // }
}
