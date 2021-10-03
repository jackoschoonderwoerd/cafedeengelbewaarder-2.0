import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromApp from './../../app.reducer'
import * as UI from './../../shared/ui.actions'
// import * as AUTH from './../../auth/auth.actions'
// import * as EXPOSITION from '../../exhibitions/exhibitions.actions'
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { User } from 'src/app/auth/user.model';
import { NavigationService } from '../navigation.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;
  language: string = 'dutch'
  linkSelected: string = null;
  openingHours;
  mealTypes: string[]

  constructor(
    private store: Store<fromApp.GlobalState>,
    private authService: AuthService,
    
    private dialog: MatDialog,
    private navigationService: NavigationService

  ) { }

  ngOnInit(): void {
    this.mealTypes = this.navigationService.getMealTypes();
    this.isAuthenticated$ = this.store.select(fromApp.getIsAuth);
    this.store.select(fromApp.getSelectedLanguage).subscribe((language: string) => {
      this.language = language
    })
    this.store.select(fromApp.getOpeningHours).subscribe(openingHours => {
      this.openingHours = openingHours;
    });
  }
  onCloseSidenav() {
    this.store.dispatch(new UI.CloseSidenav);
  }
  onLogOut() {
    this.authService.logOut()
  }
 
  mealTypeSelected(mealType) {
    this.store.dispatch(new UI.SelectedLink(mealType));
    this.onCloseSidenav();
  }

  onLogIn() {
    this.store.dispatch(new UI.CloseSidenav);
    const dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe((user: User) => {
      this.authService.login(user);
    } )
  }
}
