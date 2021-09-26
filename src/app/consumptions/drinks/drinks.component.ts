import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Beverage, BeverageType, DbDrink, DrinkItem, WineItem } from './drink-item.model';
import { DrinksService } from './drinks.service';
import * as fromApp from './../../app.reducer';
import { Store } from '@ngrx/store';
import { OpeningHours } from 'src/app/shared/opening-hours.model';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faWineBottle } from '@fortawesome/free-solid-svg-icons'
import { faWineGlass } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { AddDrinkComponent } from './add-drink/add-drink.component';
// import { drinksService } from '../consumptions.service';
import { UIService } from 'src/app/shared/ui.service';
import { Observable } from 'rxjs';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit , AfterViewInit {

  faCircle = faCircle;
  faWineGlass = faWineGlass;
  faWineBottle = faWineBottle;
  faTrash = faTrash;

  language: string = 'dutch';
  coffeeAndTeas: DrinkItem[] = [];
  softDrinks: DrinkItem[] = [];
  wines: WineItem[] = [];
  dutchSpirits: DrinkItem[] = [];
  foreignSpirits: DrinkItem[] = [];
  // beverageTypes: BeverageType[];
  openingHours: OpeningHours;

  drinks$: Observable<any>

  coffeeAndTea$: Observable<any>
  softDrinks$: Observable<any>
  wines$: Observable<any>
  dutchSpirits$: Observable<any>
  foreignSpirits$: Observable<any>
  
  categories: string[];

  isAuthenticated$: Observable<any>


  constructor(
    // private drinksService: DrinksService,
    private store: Store<fromApp.GlobalState>,
    private dialog: MatDialog,
    private drinksService: DrinksService,
    private uiService: UIService,
    // private drinksService: DrinksService

  ) { }

  ngOnInit(): void {
    this.drinksService.fetchDrinks('soft drinks').subscribe(data => {
      console.log(data);
    })
    this.isAuthenticated$ = this.store.select(fromApp.getIsAuth)
    // this.drinksService.fetchAllDrinks()
    // this.categories = this.drinksService.getCategories();
    this.coffeeAndTea$ = this.drinksService.fetchDrinks('coffee and tea')
    this.softDrinks$ = this.drinksService.fetchDrinks('soft drinks')
    this.wines$ = this.drinksService.fetchDrinks('wine')
    this.dutchSpirits$ = this.drinksService.fetchDrinks('dutch spirits')
    this.foreignSpirits$ = this.drinksService.fetchDrinks('foreign spirits')
    
    this.store.select(fromApp.getSelectedLanguage).subscribe((language: string) => {
      this.language = language;
      console.log(language)
    })
    this.store.select(fromApp.getOpeningHours).subscribe((openingHours: OpeningHours) => {
      this.openingHours = openingHours
    })
    // this.beverageTypes = this.drinksService.getBeverageTypes();
  }

  onAddDrink(category) {
    this.store.select(fromApp.getIsAuth).subscribe((isAuth: boolean) => {
      console.log(isAuth)
    })
    console.log(category)
    const dialogRef = this.dialog.open(AddDrinkComponent, {data: {action: 'add', category: category}});
    dialogRef.afterClosed().subscribe((drink: DbDrink) => {
      if(drink) {
        this.drinksService.storeDrink(drink)
      } else {
        this.uiService.showSnackbar('no drinks were added', null, 5000);
      }
    });
  }

  onDelete(event, drinkItem: DbDrink) {
    event.stopPropagation();
    console.log(event, drinkItem)
    const dialogRef = this.dialog.open(ConfirmDeleteComponent)
    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
      if(data) {
        console.log(data);
        this.drinksService.deleteDrink(drinkItem)
        .subscribe(res => {
          console.log(res);
        })
      } else {
        return
      }
    })
  }

  ngAfterViewInit() {
    // Hack: Scrolls to top of Page after page view initialized
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }
  onEdit(drink: DbDrink) {
    console.log(drink)
    this.store.select(fromApp.getIsAuth).subscribe((isAuth: boolean) => {
      console.log(isAuth)
      if(isAuth) {
        const dialogRef = this.dialog.open(AddDrinkComponent, {data: {drink: drink}})
        dialogRef.afterClosed().subscribe((drinkInfo: any) => {
          
          if(!drinkInfo) {
            this.uiService.showSnackbar('no drinks have been deleted or edited', null, 5000);
            return;
          } else {
            this.drinksService.editDrink(drinkInfo.formValue).subscribe(res => {
              this.uiService.editingSucceeded(drinkInfo.formValue.nameEnglish);
            })
          }
        })
      }
    })
  }
}
