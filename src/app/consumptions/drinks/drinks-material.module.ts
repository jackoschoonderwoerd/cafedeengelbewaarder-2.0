import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

import { MatDialogModule} from '@angular/material/dialog'; 
import { MatFormFieldModule } from "@angular/material/form-field";
import  { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [
    
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule
    
    
  ],
  exports: [
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule
  ]
})

export class DrinksMaterialModule {}