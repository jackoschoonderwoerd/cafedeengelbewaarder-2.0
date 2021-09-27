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
   
    this.sourdoughs$ = this.foodService.getFoodCategory('sourdoughs');
    this.eggs$ = this.foodService.getFoodCategory('eggs');
    this.toasties$ = this.foodService.getFoodCategory('toasties');
    this.others$ = this.foodService.getFoodCategory('others');
    this.sweets$ = this.foodService.getFoodCategory('sweets');
    // this.foodService.getFoodCategory('starter')
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

  onAddFoodItem(courseName) {
    // console.log(courseName)
    // if(courseName) {
    //   const dialogRef =  this.dialog.open(AddFoodComponent, {
    //     data: {
    //       courseName: courseName, 
    //       section: this.linkSelected
    //     },
    //     minWidth: '450px'
        
    //   });
    //   dialogRef.afterClosed().subscribe((foodItem: FoodItem) => {
    //     if(!foodItem) {
    //       this.uiService.addingFailed('')
    //     } else {
    //       console.log(foodItem);
    //       this.foodService.addFoodItem(foodItem)
    //         .then(res => {
    //           this.uiService.addingSucceeded(foodItem.nameEnglish)
    //         })
    //         .catch(err => console.log(err));
    //     }
    //   })
    // }
  }
  onEditFoodItem(foodItem: FoodItem) {
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
  }
  onDelete(event, starter: FoodItem) {
    // event.stopPropagation();
    // const dialogRef = this.dialog.open(ConfirmDeleteComponent);
    // dialogRef.afterClosed().subscribe((confirmation: string) => {
    //   console.log(confirmation);
    //   if(confirmation !== 'confirmed') {
    //     this.uiService.deletingFailed('')
    //   } else {
    //     console.log(starter);
    //     if(!starter) {
    //       this.uiService.deletingFailed('')
    //     } else {
    //       this.foodService.deleteFoodItem(starter)
    //         .then(res => {
    //           this.uiService.deletingSucceeded(starter.nameEnglish);
    //         })
    //         .catch(err => {
    //           console.log(err);
    //           this.uiService.deletingSucceeded(starter.nameEnglish);
    //         })
    //     }
    //   }
    // })
  }

}
