import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDeleteComponent } from './confirm-delete.component';
import { ConfirmDeleteMaterialModule } from './confirm-delete-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    ConfirmDeleteComponent
  ],
  imports: [
    CommonModule,
    ConfirmDeleteMaterialModule,
    FlexLayoutModule
  ]
})
export class ConfirmDeleteModule { }
