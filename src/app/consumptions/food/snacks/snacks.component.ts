import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OpeningHours } from 'src/app/shared/opening-hours.model';
import { FoodItem } from '../../models/food-item.model';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import * as fromApp from '../../../app.reducer';
import { Store } from '@ngrx/store';
import { FoodService } from '../food.service';
import { MatDialog } from '@angular/material/dialog';
import { UIService } from 'src/app/shared/ui.service';


@Component({
  selector: 'app-snacks',
  templateUrl: './snacks.component.html',
  styleUrls: ['./snacks.component.scss']
})
export class SnacksComponent implements OnInit {

  openingHours: OpeningHours

  language: string = 'dutch';
  linkSelected: string;

  
  smalls$: Observable<FoodItem[]>;
  omabobs$: Observable<FoodItem[]>;
  otherSnacks$: Observable<FoodItem[]>;
  sweetSnacks$: Observable<FoodItem[]>;


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
    this.store.subscribe(storeContent => {
      if(storeContent.ui.selectedLink === 'lunch') {
        this.linkSelected = 'lunch'
      } else if (storeContent.ui.selectedLink === 'snacks') {
        this.linkSelected = 'snacks'
      } else if (storeContent.ui.selectedLink === 'food') {
        this.linkSelected = 'food'
      }
    })
  }
}

