import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminGuard } from '../auth/auth-admin.guard';
import { AuthGuard } from '../auth/auth-guard';
import { ProgramComponent } from './program/program.component';



const routes: Routes = [
  
  { path: 'program', component: ProgramComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }