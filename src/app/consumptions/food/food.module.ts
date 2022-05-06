import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FlexLayoutModule } from '@angular/flex-layout';
import { AddFoodComponent } from './add-food/add-food.component';
import { FoodMaterialModule } from './food-material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { FoodRoutingModule } from './food-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FoodComponent } from './food.component';

import { AddCourseComponent } from './add-course/add-course.component';
import { InsideOutsideDialogComponent } from './inside-outside-dialog/inside-outside-dialog.component';




@NgModule({
  declarations: [
    FoodComponent,
    AddFoodComponent,
    AddCourseComponent,
    InsideOutsideDialogComponent,

  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FoodMaterialModule,
    ReactiveFormsModule,
    FoodRoutingModule,
    FontAwesomeModule
  ]
})
export class FoodModule { }
