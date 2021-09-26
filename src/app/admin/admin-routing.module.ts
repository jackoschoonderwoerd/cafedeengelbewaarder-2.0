import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminGuard } from '../auth/auth-admin.guard';
import { AuthGuard } from '../auth/auth-guard';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { AdminComponent } from './admin.component';



const routes: Routes = [
  { path: '', component: AdminComponent, canActivate: [AuthGuard, AuthAdminGuard]},
  { path: 'add-entry', loadChildren: () => import('./add-entry/add-entry.module')
  .then(m => m.AddEntryModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }