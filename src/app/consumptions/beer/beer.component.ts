import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as fromApp from './../../app.reducer';
// import { BeerDialogComponent } from './beer-dialog/beer-dialog.component';
import { BeerItem } from './beer-item.model';
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
  beers: BeerItem[] = [];
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
    // this.beers = this.beerService.getBeers();
    this.initForm();
    this.getBeers();
    // this.beers$ = this.consumptionsService.fetchBeers()
    this.beers$ = this.beerService.fetchBeers();
    this.isAuthenticated$ = this.store.select(fromApp.getIsAuth);
  }

  initForm() {
    this.addBeerForm = this.fb.group({
      name: new FormControl('lekker bier', Validators.required),
      draught: new FormControl(true),
      price: new FormControl(50, Validators.required),
      content: new FormControl(250, Validators.required),
      percentage: new FormControl(7.5, Validators.required),
      descriptionDutch: new FormControl(
        'heel lekker bier',
        Validators.required
      ),
      descriptionEnglish: new FormControl(
        'very nice beer',
        Validators.required
      ),
    });
  }

  submit() {
    console.log(this.addBeerForm.value);
    // this.consumptionsService.storeBeer(this.addBeerForm.value)
    this.beerService.storeBeer(this.addBeerForm.value);
  }

  onEdit(event, beerItem: BeerItem) {
    this.store.select(fromApp.getIsAuth).subscribe((isAuth: boolean) => {
      console.log(isAuth);
      if (isAuth) {
        event.stopPropagation();
        console.log(beerItem);
        const dialogRef = this.dialog.open(AddBeerComponent, {
          data: { beerItem: beerItem },
        });
        dialogRef.afterClosed().subscribe((beerItemInfo: any) => {
          if (!beerItemInfo) {
            this.uiService.showSnackbar(
              'no beers were edited or added',
              null,
              5000
            );
          } else {
            console.log(beerItemInfo);
            if (beerItemInfo.purpose === 'delete') {
              const dialogRef = this.dialog.open(ConfirmDeleteComponent);
              dialogRef.afterClosed().subscribe((data) => {
                if (data === 'confirmed') {
                  console.log(beerItemInfo.formValue);
                  this.beerService.deleteBeer(beerItemInfo.formValue);
                } else if (data === 'cancelled') {
                  this.uiService.showSnackbar(
                    'Cancelled, nothing was deleted',
                    null,
                    5000
                  );
                }
              });
            } else if (beerItemInfo.purpose === 'save changes') {
              this.beerService.editBeer(beerItemInfo.formValue);
            }
          }
        });
      } 
    });
  }

  onAddBeer() {
    const dialogRef = this.dialog.open(AddBeerComponent, { width: '500px' });
    dialogRef.afterClosed().subscribe((beerItemInfo: any) => {
      if (beerItemInfo) {
        // this.consumptionsService.storeBeer(beerItem);
        this.beerService.storeBeer(beerItemInfo.formValue);
      } else {
        this.uiService.showSnackbar('nothing was added', null, 5000);
      }
    });
  }
  getBeers() {
    // this.consumptionsService.fetchBeers().subscribe(beer => console.log(beer));
    this.beerService.fetchBeers().subscribe((beer) => console.log(beer));
  }
  onDelete(event, beerItem: BeerItem) {
    event.stopPropagation();
    console.log(beerItem);
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);
    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.beerService.deleteBeer(beerItem).subscribe(data => {
          this.uiService.deletingSucceeded(beerItem.name);
        })
      }
    })
  }
}
