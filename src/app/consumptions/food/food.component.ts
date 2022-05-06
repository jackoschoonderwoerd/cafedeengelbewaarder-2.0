import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OpeningHours } from 'src/app/shared/opening-hours.model';
import { Course, FoodItem, MealType } from '../models/food-item.model';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'


import { Store } from '@ngrx/store';

import { FoodService } from './food.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UIService } from 'src/app/shared/ui.service';
import * as fromApp from '../../app.reducer';
import { AddFoodComponent } from './add-food/add-food.component';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { InsideOutsideDialogComponent } from './inside-outside-dialog/inside-outside-dialog.component';

@Component({
    selector: 'app-food',
    templateUrl: './food.component.html',
    styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {


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
    faChevronDown = faChevronDown;
    faChevronUp = faChevronUp;
    isAuthenticated$: Observable<boolean>;
    dinner: MealType;

    allFood: MealType[];
    mealType: string = 'dinner'
    dinner$: Observable<any>
    isOutside: boolean = false;


    constructor(
        private store: Store<fromApp.GlobalState>,
        private foodService: FoodService,
        private dialog: MatDialog,
        private uiService: UIService,
    ) { }

    ngOnInit(): void {
        console.log('food oninit')
        this.store.subscribe(data => {
            console.log(data);
            if (!data.ui.selectedLink) {
                this.onSelectMealType('dinner');
                console.log('DFINNER')
                
            } else {
                this.mealType = data.ui.selectedLink;
                // console.log('CIGAR!!!');
                // if(this.mealType === 'dinner') {
                //     const dialogRef = this.dialog.open(InsideOutsideDialogComponent, {
                //         panelClass: 'inside-outside-dialog',
                //         minWidth: '310px',
                //         maxWidth: '400px'
                //     });
                //     dialogRef.afterClosed().subscribe((insideOutside: string) => {
                //         this.uiService.insideOutside.emit(insideOutside);
        
                //     })
                // }
                this.onSelectMealType(data.ui.selectedLink);
            }
        });
        this.uiService.insideOutside.subscribe((insideOutside: string) => {
            console.log(insideOutside);
            if(insideOutside === 'inside') {
                this.isOutside = false;
            } else if (insideOutside === 'outside') {
                this.isOutside = true
            }
        })

        this.isAuthenticated$ = this.store.select(fromApp.getIsAuth);

        this.store.select(fromApp.getSelectedLanguage).subscribe((language: string) => {
            this.language = language
        });
        this.store.select(fromApp.getOpeningHours).subscribe((openingHours: OpeningHours) => {
            this.openingHours = openingHours
        })
    }

    calculateFoodItemsAvailableOutside(course: Course) {
        let availableOutside = 0
        console.log(course)
        course.foodItems.forEach((foodItem) => {
            if(foodItem.availableOutside) {
                availableOutside = availableOutside + 1
            }
        })
        console.log(availableOutside)
        return availableOutside
    }

    onChangeLocation() {
        this.isOutside = !this.isOutside
    }

    insideOutside() {
        const dialogRef = this.dialog.open(InsideOutsideDialogComponent);
    }

    onSelectMealType(mealType) {
        console.log(mealType)
        this.mealType = mealType;
        this.foodService.checkForMealtypeDb(mealType)
        this.foodService.fetchMealTypeSnapshotChangesForLocalUse(this.mealType);
        this.dinner$ = this.foodService.fetchMealTypeSnapshotChanges(this.mealType);
    }

    onAddCourse() {
        const dialogRef = this.dialog.open(AddCourseComponent, {
            data: {
                mealType: this.mealType,
                editMode: false,
            },
            panelClass: 'dialog-dimensions',
        })
        dialogRef.afterClosed().subscribe((course: Course) => {
            if (course) {
                course.foodItems = [];
                this.foodService.addCourse(this.mealType, course);
            }
            return
        })
    }

    onEditCourse(course: Course) {
        const dialogRef = this.dialog.open(AddCourseComponent, {
            data: {
                course: course,
                editMode: true
            },
            panelClass: 'dialog-dimensions'
        })
        dialogRef.afterClosed().subscribe((course: Course) => {
            if (course) {
                this.foodService.editCourse(this.mealType, course);
            }
            return
        })
    }

    onDeleteCourse(courseId) {
        console.log(courseId);
        const dialogRef = this.dialog.open(ConfirmDeleteComponent);
        dialogRef.afterClosed().subscribe(data => {
            if (data) {
                this.foodService.deleteCourse(this.mealType, courseId);
            }
            return
        })
    }

    onMoveCourse(direction: string, courseId: string, mealType: string) {
        console.log(direction, courseId, mealType)
        this.foodService.moveCourse(direction, courseId, this.mealType);
    }

    onAddFoodItem(courseId, courseNameDutch, courseNameEnglish) {
        if (courseId) {
            const dialogRef = this.dialog.open(AddFoodComponent, {
                data: {
                    courseId: courseId,
                    courseNameDutch: courseNameDutch,
                    courseNameEnglish: courseNameEnglish,
                },
                panelClass: 'dialog-dimensions'
            });
            dialogRef.afterClosed().subscribe((foodItem: FoodItem) => {
                if (!foodItem) {
                    this.uiService.addingFailed('')
                } else {
                    console.log(foodItem)
                    // this.foodService.addFoodItem(this.mealType, courseId, foodItem)
                }
            })
        }
        return;
    }

    onDeleteFoodItem(courseId, foodItemId) {
        console.log(courseId, foodItemId);
        const dialogRef = this.dialog.open(ConfirmDeleteComponent)
        dialogRef.afterClosed().subscribe(data => {
            if (data) {
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
            if (foodItem) {
                this.foodService.editFoodItem(this.mealType, courseId, foodItem)
            }
            return
        })
    }
    onMoveFoodItem(direction, courseId, foodItemId) {
        console.log(this.mealType, direction, courseId, foodItemId);
        this.foodService.moveFoodItem(this.mealType, direction, courseId, foodItemId)
    }
}
