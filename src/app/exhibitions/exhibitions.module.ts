import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExhibitionsComponent } from './exhibitions.component';
import { ExhibitionsRoutingModule } from './exhibitions-routing.module';
import { ShowCaseComponent } from './show-case/show-case.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { AddExhibitionComponent } from './add-exhibition/add-exhibition.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExhibitionsMaterialModule } from './exhibitions-material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AddImageComponent } from './add-exhibition/add-image/add-image.component';






@NgModule({
  declarations: [
    
    ExhibitionsComponent,
    ShowCaseComponent,
    AddExhibitionComponent,
    AddImageComponent,

  ],
  imports: [
    CommonModule,
    ExhibitionsRoutingModule,
    FlexLayoutModule,
    MatCarouselModule,
    ReactiveFormsModule,
    ExhibitionsMaterialModule,
    MatNativeDateModule,
    AngularFireStorageModule

    
    // FontAwesomeModule
    
  ]
})
export class ExhibitionsModule { }
