import { UserAccountComponent } from './user-account/user-account.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryPageComponent } from './category-page/category-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user-account',
    component: UserAccountComponent
  },
  {
    path: 'user-account/:tabID',
    component: UserAccountComponent
  },
  {
    path: 'products-category/:categoryName',
    component: CategoryPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
