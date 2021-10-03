import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrinksComponent } from './drinks.component';
import { DrinksRoutingModule } from './drinks-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddDrinkComponent } from './add-drink/add-drink.component';
import { DrinksMaterialModule } from './drinks-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCategoryComponent } from './add-category/add-category.component';



@NgModule({
  declarations: [
    DrinksComponent,
    AddDrinkComponent,
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    DrinksRoutingModule,
    FlexLayoutModule,
    FontAwesomeModule,
    DrinksMaterialModule,
    ReactiveFormsModule
  ]
})
export class DrinksModule { }
