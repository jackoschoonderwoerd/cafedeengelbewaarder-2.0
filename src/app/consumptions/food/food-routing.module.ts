import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DinnerComponent } from './dinner/dinner.component';
import { FoodComponent } from './food.component';
import { LunchComponent } from './lunch/lunch.component';
import { SnacksComponent } from './snacks/snacks.component';




const routes: Routes = [
  { path: '', component: FoodComponent },
  { path: 'dinner', component: DinnerComponent },
  { path: 'snacks', component: SnacksComponent },
  { path: 'lunch', component: LunchComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodRoutingModule { }
