import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as fromApp from './../../app.reducer';
// import { BeerDialogComponent } from './beer-dialog/beer-dialog.component';
import { Beer } from './beer.model';
import { BeerService } from './beer.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faWineBottle } from '@fortawesome/free-solid-svg-icons';
import { faWineGlass } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { AddBeerComponent } from './add-beer/add-beer.component';
import { Observable } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { ShowBeerComponent } from './show-beer/show-beer.component';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.scss'],
})
export class BeerComponent implements OnInit {
  language: string = 'dutch';
  beers: Beer[] = [];
  panelOpenState: boolean = true;
  beers$: Observable<any>;
  beerArray$: Observable<any>
  isAuthenticated$: Observable<any>;
  isAuthenticated: boolean = false

  faTrash = faTrash;
  faCoffee = faCoffee;
  faWineBottle = faWineBottle;
  faWineGlass = faWineGlass;
  faEdit = faEdit;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight

  constructor(
    private store: Store<fromApp.GlobalState>,
    private beerService: BeerService,
    private dialog: MatDialog,
    private uiService: UIService,
    
  ) {}

  ngOnInit(): void {
    this.beerService.fetchBeerArrayForLocalUse()
    this.beerService.fetchBeerArray();
    // this.beerService.fetchBeersForLocalUse();
    this.store
      .select(fromApp.getSelectedLanguage)
      .subscribe((language: string) => {
        this.language = language;
      });
    this.store
      .select(fromApp.getIsAuth)
      .subscribe((isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated
      })
    // this.beers$ = this.beerService.fetchBeers();
    this.beerArray$ = this.beerService.fetchBeerArray();
    this.isAuthenticated$ = this.store.select(fromApp.getIsAuth);
  }

  onAddToBeerArray() {
    const dialogRef  = this.dialog.open(AddBeerComponent);
    dialogRef.afterClosed().subscribe((beer: Beer) => {
      if(!beer) {
        return
      } else {
        this.beerService.addBeerToArray(beer);
      }
    })
  }
  
  onDeleteFromBeerArray(beerId: string) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent)
    dialogRef.afterClosed().subscribe(confirmation => {
      if(!confirmation) {
        return
      } else {
        console.log(beerId)
        this.beerService.deleteBeerFromArray(beerId);
      }
    })
  }

  onShowBeer(beer: Beer) {
    this.dialog.open(ShowBeerComponent, { 
    data: {
      beer: beer
    },
    panelClass: 'dialog-dimensions'})
  }

  // onAddBeer() {
  //   const dialogRef = this.dialog.open(AddBeerComponent, { width: '500px' });
  //   dialogRef.afterClosed().subscribe((beer: Beer) => {
  //     if (beer) {
  //       this.beerService.storeBeer(beer);
  //     } else {
  //       this.uiService.showSnackbar('nothing was added', null, 5000);
  //     }
  //   });
  // }

  onEdit(event, beer: Beer) {
    if(this.isAuthenticated) {
      event.stopPropagation();
      const dialogRef = this.dialog.open(AddBeerComponent, {
        data: {
          beer
        }
      });
      dialogRef.afterClosed().subscribe((beer: Beer) => {
        if(beer) {
          this.beerService.editBeer(beer)
        } else {
          this.uiService.showSnackbar('nothing was edited', null, 5000);
        }
      })
    }
  }

  // onDelete(event, beerItem: Beer) {
  //   event.stopPropagation();
  //   console.log(beerItem);
  //   const dialogRef = this.dialog.open(ConfirmDeleteComponent);
  //   dialogRef.afterClosed().subscribe(confirmation => {
  //     if (confirmation) {
  //       this.beerService.deleteBeer(beerItem)
  //     } else {
  //       this.uiService.showSnackbar('nothing was deleted', null, 5000);
  //     }
  //   })
  // }
  onMoveBeer(event: Event, direction: string, beerId: string) {
    event.stopPropagation();
    
    this.beerService.moveBeer(direction, beerId)
  }
}
