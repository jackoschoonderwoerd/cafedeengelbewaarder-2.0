import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExhibitionComponent } from './add-exhibition/add-exhibition.component';
import { ExhibitionsComponent } from './exhibitions.component';
import { ShowCaseComponent } from './show-case/show-case.component';







const routes: Routes = [
  { path: '', component: ExhibitionsComponent},
  { path: 'showcase', component: ShowCaseComponent },
  { path: 'add-exhibition', component: AddExhibitionComponent },
  // { path: 'exposition-jazzsession/:id', component: ShowCaseComponent},
  { path: '**', component: ExhibitionsComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExhibitionsRoutingModule { }
