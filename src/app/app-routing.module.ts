import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';


import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  // { path: 'signup', component: SignupComponent },
  // { path: 'login', component: LoginComponent },
  
  
  // { path: 'admin', loadChildren: () => import('./admin/admin.module')
  //   .then(m => m.AdminModule)},
  // { path: 'user', loadChildren: () => import('./user/user.module')
  //   .then(m => m.UserModule)},
  { path: 'food', loadChildren: () => import('./consumptions/food/food.module').then(m => m.FoodModule)},
  { path: 'beers', loadChildren: () => import('./consumptions/beer/beer.module').then(m => m.BeerModule)},
  { path: 'exhibitions', loadChildren: () => import('./exhibitions/exhibitions.module').then(m => m.ExhibitionsModule)},
  { path: 'new-exhibitions',
    loadChildren: () => import('./new-exhibitions/new-exhibitions.module').then(m => m.NewExhibitionsModule),
  },
  
  { path: 'drinks', loadChildren: () => import('./consumptions/drinks/drinks.module').then(m => m.DrinksModule)},

  // { path: 'lunch', component: LunchComponent},
  { path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
