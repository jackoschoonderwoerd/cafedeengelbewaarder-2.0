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
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConsumptionsService } from '../consumptions.service';
import { AddBeerComponent } from './add-beer/add-beer.component';
import { Observable } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.scss'],
})
export class BeerComponent implements OnInit {
  language: string = 'dutch';
  // draughtBeers: BeerItem[] = [];
  // bottledBeers: BeerItem[] = [];
  beers: Beer[] = [];
  panelOpenState: boolean = true;
  addBeerForm: FormGroup;
  beers$: Observable<any>;
  isAuthenticated$: Observable<any>;

  faTrash = faTrash;
  faCoffee = faCoffee;
  faWineBottle = faWineBottle;
  faWineGlass = faWineGlass;

  constructor(
    private store: Store<fromApp.GlobalState>,
    private beerService: BeerService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    // private consumptionsService: ConsumptionsService,
    private uiService: UIService,
    
  ) {}

  ngOnInit(): void {
    this.store
      .select(fromApp.getSelectedLanguage)
      .subscribe((language: string) => {
        this.language = language;
      });
    
    this.beers$ = this.beerService.fetchBeers();
    this.isAuthenticated$ = this.store.select(fromApp.getIsAuth);
  }


  onAddBeer() {
    const dialogRef = this.dialog.open(AddBeerComponent, { width: '500px' });
    dialogRef.afterClosed().subscribe((beer: Beer) => {
      if (beer) {
        this.beerService.storeBeer(beer);
      } else {
        this.uiService.showSnackbar('nothing was added', null, 5000);
      }
    });
  }

  onEdit(event, beer: Beer) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(AddBeerComponent, {
      data: {
        beer
      }
    });
    dialogRef.afterClosed().subscribe((beer: Beer) => {
      if(beer) {
        this.beerService.editBeer(beer).subscribe(res => {
          this.uiService.showSnackbar('database updated', null, 5000)
        });
      } else {
        this.uiService.showSnackbar('nothing was edited', null, 5000);
      }
    })
  }

  onDelete(event, beerItem: Beer) {
    event.stopPropagation();
    console.log(beerItem);
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);
    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.beerService.deleteBeer(beerItem).subscribe(data => {
          this.uiService.deletingSucceeded(beerItem.name);
        })
      } else {
        this.uiService.showSnackbar('nothing was deleted', null, 5000);
      }
    })
  }



}
