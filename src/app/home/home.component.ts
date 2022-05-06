import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FoodService } from '../consumptions/food/food.service';
import { InsideOutsideDialogComponent } from '../consumptions/food/inside-outside-dialog/inside-outside-dialog.component';
import { OpeningHours } from '../shared/opening-hours.model';
import { UIService } from '../shared/ui.service';
import * as fromApp from './../app.reducer';
import * as UI from './../shared/ui.actions'




@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    selectedLanguage$: Observable<string>
    openingHours: OpeningHours;
    language: string = 'dutch'
    reader = new FileReader
    link = 'assets'
    menuItemsDutch: string[] = [
        'dranken', 'lunch', 'diner', 'snacks', 'bieren', 'exposities'
    ]
    menuItemsEnglish: string[] = [
        'drinks', 'lunch', 'dinner', 'snacks', 'beers', 'exhibitions'
    ]

    constructor(
        private store: Store<fromApp.GlobalState>,
        private router: Router,
        private foodService: FoodService,
        private dialog: MatDialog,
        private uiService: UIService
    ) {


    }


    ngOnInit(): void {
        fetch(`./assets/text.txt`)


        this.selectedLanguage$ = this.store.select(fromApp.getSelectedLanguage);
        this.store.select(fromApp.getSelectedLanguage).subscribe((selectedLanguage: string) => {
            this.language = selectedLanguage
        });
        this.store.select(fromApp.getOpeningHours).subscribe((openingHours: OpeningHours) => {
            console.log(openingHours);
            this.openingHours = openingHours
        })
    }

    onLinkSelected(menuItem) {
        console.log(menuItem)
        switch (menuItem) {
            case 'dranken':
                this.store.dispatch(new UI.SelectedLink('dranken'));
                this.router.navigate(['/drinks']);
                break;
            case 'drinks':
                this.store.dispatch(new UI.SelectedLink('drinks'));
                this.router.navigate(['/drinks']);
                break;
            case 'lunch':
                this.store.dispatch(new UI.SelectedLink('lunch'));
                this.router.navigate(['/food']);
                break;
            case 'diner':

                this.store.dispatch(new UI.SelectedLink('dinner'));
                this.router.navigate(['/food']);
                this.openInsideOutsideDialog()
               
                break;
            case 'dinner':
                this.store.dispatch(new UI.SelectedLink('dinner'));
                this.router.navigate(['/food']);
                this.openInsideOutsideDialog()
                break;
            case 'snacks':
                this.store.dispatch(new UI.SelectedLink('snacks'));
                this.router.navigate(['/food']);
                break;
            case 'bieren':
                console.log(menuItem)
                this.store.dispatch(new UI.SelectedLink('bieren'));
                this.router.navigate(['/beers']);
                break;
            case 'beers':
                console.log(menuItem)
                this.store.dispatch(new UI.SelectedLink('beers'));
                this.router.navigate(['/beers']);
                break;
            case 'exposities':
                this.store.dispatch(new UI.SelectedLink('exposities'));
                this.router.navigate(['/exhibitions'])
                break;
            case 'exhibitions':
                this.store.dispatch(new UI.SelectedLink('exhibitions'));
                this.router.navigate(['/exhibitions'])
                break;
            default: {
                this.store.dispatch(new UI.SelectedLink('home'));
                this.router.navigate(['/home']);
                break
            }
        }
    }
    openInsideOutsideDialog() {
        const dialogRef = this.dialog.open(InsideOutsideDialogComponent, {
            panelClass: 'inside-outside-dialog',
            width: '90vw',
            maxWidth: '400px'
            
        });
        dialogRef.afterClosed().subscribe((insideOutside: string) => {
            this.uiService.insideOutside.emit(insideOutside);
        })
    }
}
