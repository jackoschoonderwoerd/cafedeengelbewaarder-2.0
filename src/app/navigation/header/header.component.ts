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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userEmail$: Observable<string>
  isAdmin$: Observable<boolean>
  selectedLanguage$: Observable<string>
  language: string = 'dutch';
  expositionId: string;
  isShowcaseActive: boolean = false;
  lunchActive = 'no';
  linkSelected: string;

  constructor(
    private store: Store<fromRoot.GlobalState>,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.store.subscribe(data => console.log(data));
    this.store.select(fromRoot.getSelectedLanguage).subscribe((language: string) => {
      this.language = language;
    });
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

  
  expositionSelected() {
    this.store.dispatch(new EXPOSITION.SetExhibitionId(null))
  }
  onLogIn() {
    const dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe((user: User) => {
      if(user) {
        this.authService.login(user);
      }
      return;
    });
  }
}