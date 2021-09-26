import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramComponent } from './program/program.component';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [
    ProgramComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
