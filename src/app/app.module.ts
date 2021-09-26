import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { AuthModule } from './auth/auth.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { environment } from 'src/environments/environment';
import { reducers } from './app.reducer';

import { AuthGuard } from './auth/auth-guard';
import { AuthAdminGuard } from './auth/auth-admin.guard';
import { ConfirmDeleteComponent } from './shared/confirm-delete/confirm-delete.component';
import { ConfirmDeleteModule } from './shared/confirm-delete/confirm-delete.module';


// import { FoodModule } from './food/food.module';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidenavComponent,
    
    FooterComponent,
    
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
