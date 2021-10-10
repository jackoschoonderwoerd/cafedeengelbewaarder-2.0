import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeerComponent } from './beer.component';
import { BeerRoutingModule } from './beer-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BeerMaterialModule } from './beer-material.module';

// import { BeerDialogComponent } from './beer-dialog/beer-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule} from '@angular/material/expansion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { AddBeerComponent } from './add-beer/add-beer.component';
import { ShowBeerComponent } from './show-beer/show-beer.component';



@NgModule({
  declarations: [
    BeerComponent,
    // BeerDialogComponent,
    AddBeerComponent,
    ShowBeerComponent
  ],
  imports: [
    CommonModule,
    BeerRoutingModule,
    FlexLayoutModule,
    BeerMaterialModule,
    HttpClientModule,
    MatExpansionModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ]
})
export class BeerModule { }
