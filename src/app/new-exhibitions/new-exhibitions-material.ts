import { NgModule } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {OverlayModule} from '@angular/cdk/overlay';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBar, MatProgressBarModule } from "@angular/material/progress-bar";


@NgModule({
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    OverlayModule,
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatProgressBar,
    OverlayModule
  ]
})

export class NewExhibitionsMaterialModule { }