import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewAddExhibitionComponent } from './new-add-exhibition/new-add-exhibition.component';
import { NewAddImageComponent } from './new-add-exhibition/new-add-image/new-add-image.component';
import { NewExhibitionsComponent } from './new-exhibitions.component';
import { NewExhibitionsRoutingModule } from './new-exhibitions-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewExhibitionsMaterialModule } from './new-exhibitions-material';
import { MatNativeDateModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShowExpositionComponent } from './show-exposition/show-exposition.component';
import { CapitalizeNamePipe } from '../pipes/capitalize-name.pipe';
import { FullSizeDialogComponent } from './show-exposition/full-size-dialog/full-size-dialog.component';
import {OverlayModule} from '@angular/cdk/overlay';



@NgModule({
  declarations: [
    NewExhibitionsComponent,
    NewAddExhibitionComponent,
    NewAddImageComponent,
    ShowExpositionComponent,
    CapitalizeNamePipe,
    FullSizeDialogComponent
  ],
  imports: [
    CommonModule,
    NewExhibitionsRoutingModule,
    ReactiveFormsModule,
    NewExhibitionsMaterialModule,
    MatNativeDateModule,
    FlexLayoutModule
  ]
})
export class NewExhibitionsModule { }
