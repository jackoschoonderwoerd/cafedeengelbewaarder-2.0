import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing-module';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';

import { AngularFireAuthModule } from '@angular/fire/auth'

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthMaterialModule } from './auth-material.module';








@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    AngularFireAuthModule,
    AuthMaterialModule
  ]
})
export class AuthModule { }
