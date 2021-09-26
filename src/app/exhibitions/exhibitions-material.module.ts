import { NgModule } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatButtonModule } from "@angular/material/button";


@NgModule({
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule
  ]
})

export class ExhibitionsMaterialModule { }