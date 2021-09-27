import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FlexLayoutModule } from '@angular/flex-layout';
import { AddFoodComponent } from './add-food/add-food.component';
import { FoodMaterialModule } from './food-material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { FoodRoutingModule } from './food-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DinnerComponent } from './dinner/dinner.component';
import { SnacksComponent } from './snacks/snacks.component';
import { LunchComponent } from './lunch/lunch.component';
import { AddCourseComponent } from './add-course/add-course.component';




@NgModule({
  declarations: [
    DinnerComponent,
    SnacksComponent,
    LunchComponent,
    AddFoodComponent,
    AddCourseComponent,

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
