import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import * as fromRoot from './../../app.reducer';
import * as UI from './../../shared/ui.actions';
import * as EXPOSITION from '../../exhibitions/exhibitions.actions'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { User } from 'src/app/auth/user.model';
import { NavigationService } from '../navigation.service';
import { InsideOutsideDialogComponent } from 'src/app/consumptions/food/inside-outside-dialog/inside-outside-dialog.component';
import { UIService } from 'src/app/shared/ui.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    mealTypes: string[];
    userEmail$: Observable<string>
    isAdmin$: Observable<boolean>
    selectedLanguage$: Observable<string>
    language: string = 'dutch';
    expositionId: string;
    isShowcaseActive: boolean = false;
    lunchActive = 'no';
    linkSelected: string;
    selectedMealType: string;
    isAuth$: Observable<boolean>;

    constructor(
        private store: Store<fromRoot.GlobalState>,
        private authService: AuthService,
        private router: Router,
        private dialog: MatDialog,
        private navigationService: NavigationService,
        private uiService: UIService
    ) { }

    ngOnInit(): void {
        this.mealTypes = this.navigationService.getMealTypes();
        this.store.select(fromRoot.getSelectedLanguage).subscribe((language: string) => {
            this.language = language;
        });
        this.isAuth$ = this.store.select(fromRoot.getIsAuth)
        this.store.select(fromRoot.getIsShowcaseActive).subscribe((isShowcaseActive: boolean) => {
            this.isShowcaseActive = isShowcaseActive
        });
        this.store.select(fromRoot.getIsDinnerOrLunchOrSnacks).subscribe((dinnerOrLunchOrSnacks) => {
            this.linkSelected = dinnerOrLunchOrSnacks
        });
        this.userEmail$ = this.store.select(fromRoot.getUserEmail);
        this.isAdmin$ = this.store.select(fromRoot.getIsAdmin);
        this.selectedLanguage$ = this.store.select(fromRoot.getSelectedLanguage);
    }
    onOpenSidenav() {
        this.store.dispatch(new UI.OpenSidenav);
    }
    onLogOut() {
        this.authService.logOut();
    }

    selectedLanguage(language: string) {
        this.store.dispatch(new UI.SelectedLanguage(language))
    }

    mealTypeSelected(mealType) {
        this.selectedMealType = mealType;
        if(mealType === 'dinner') {
            const dialogRef = this.dialog.open(InsideOutsideDialogComponent, {
                panelClass: 'inside-outside-dialog',
                minWidth: '310px',
                maxWidth: '400px'
            });
            dialogRef.afterClosed().subscribe((insideOutside: string) => {
                this.uiService.insideOutside.emit(insideOutside);

            })
        }
        this.store.dispatch(new UI.SelectedLink(mealType))
    }

    expositionSelected() {
        this.store.dispatch(new EXPOSITION.SetExhibitionId(null))
    }
    onLogIn() {
        const dialogRef = this.dialog.open(LoginComponent);
        dialogRef.afterClosed().subscribe((user: User) => {
            if (user) {
                this.authService.login(user);
            }
            return;
        });
    }
}
