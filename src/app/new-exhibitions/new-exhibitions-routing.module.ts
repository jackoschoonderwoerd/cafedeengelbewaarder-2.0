import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewAddExhibitionComponent } from './new-add-exhibition/new-add-exhibition.component';
// import { AddExhibitionComponent } from './add-exhibition/add-exhibition.component';
// import { ExhibitionsComponent } from './exhibitions.component';
import { NewExhibitionsComponent } from './new-exhibitions.component';
import { ShowExpositionComponent } from './show-exposition/show-exposition.component';
// import { ShowCaseComponent } from './show-case/show-case.component';







const routes: Routes = [
  { path: '', component: NewExhibitionsComponent },
  { path: 'new-add-exhibition', component: NewAddExhibitionComponent },
  { path: 'show-exhibition', component: ShowExpositionComponent },
  { path: '**', component: NewExhibitionsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewExhibitionsRoutingModule { }
