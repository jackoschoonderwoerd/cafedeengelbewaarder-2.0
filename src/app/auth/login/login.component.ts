import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../app.reducer'
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isAuth$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromRoot.GlobalState>,
    public dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
    this.dialogRef.updateSize('350px')
    this.initForm()
    this.isAuth$ = this.store.select(fromRoot.getIsAuth)
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  initForm() {
    this.loginForm = this.fb.group({
        email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
        password: new FormControl(null, { 
        validators: [Validators.required] })
    });
  }
}
