


import { AngularFireModule } from '@angular/fire';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthAdminGuard } from './auth/auth-admin.guard';
import { AuthGuard } from './auth/auth-guard';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmDeleteComponent } from './shared/confirm-delete/confirm-delete.component';
import { ConfirmDeleteModule } from './shared/confirm-delete/confirm-delete.module';
import { CoronaDialogComponent } from './corona-dialog/corona-dialog.component';
import { environment } from 'src/environments/environment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './navigation/footer/footer.component';
import { HeaderComponent } from './navigation/header/header.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { reducers } from './app.reducer';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { StoreModule } from '@ngrx/store';



// import { FoodModule } from './food/food.module';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidenavComponent,
    
    FooterComponent,
          CoronaDialogComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    MaterialModule,
    FlexLayoutModule,
    StoreModule.forRoot(reducers),
    AuthModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    ConfirmDeleteModule
    // FoodModule
    
    
    
  ],
  providers: [AuthGuard, AuthAdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
