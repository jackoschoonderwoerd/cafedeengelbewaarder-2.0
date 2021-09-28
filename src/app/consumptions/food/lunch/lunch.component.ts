import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OpeningHours } from 'src/app/shared/opening-hours.model';
import { FoodItem } from '../../models/food-item.model';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store';
import * as fromApp from '../../../app.reducer';
import { FoodService } from '../food.service';
import { MatDialog } from '@angular/material/dialog';
import { UIService } from 'src/app/shared/ui.service';
import { AddFoodComponent } from '../add-food/add-food.component';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-lunch',
  templateUrl: './lunch.component.html',
  styleUrls: ['./lunch.component.scss']
})
export class LunchComponent implements OnInit {

  openingHours: OpeningHours

  language: string = 'dutch';
  linkSelected: string;

  sourdoughs$: Observable<FoodItem[]>;
  eggs$: Observable<FoodItem[]>;
  toasties$: Observable<FoodItem[]>;
  desserts$: Observable<FoodItem[]>;
  others$: Observable<FoodItem[]>;
  sweets$: Observable<FoodItem[]>;


  isAuthenticated$: Observable<boolean>
  faTrash = faTrash;


  constructor(
    private store: Store<fromApp.GlobalState>,
    private foodService: FoodService,
    private dialog: MatDialog,
    private uiService: UIService,
  ) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(fromApp.getIsAuth);
   
    
    this.store.select(fromApp.getSelectedLanguage).subscribe((language: string) => {
      this.language = language
    });
    this.store.select(fromApp.getOpeningHours).subscribe((openingHours: OpeningHours) => {
      this.openingHours = openingHours
    })
  }
}
