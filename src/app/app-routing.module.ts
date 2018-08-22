import { ShoppingBusketComponent } from './shopping-basket/shopping-basket.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryPageComponent } from './category-page/category-page.component';
import { SpecialsPageComponent } from './specials-page/specials-page.component';
import { UserManageProfileComponent } from './user-manage-profile/user-manage-profile';

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
  },
  {
    path: 'specials',
    component: SpecialsPageComponent
  },
  {
    path: 'shopping-bascket',
    component: ShoppingBusketComponent
  },
  {
    path: 'manage-profile',
    component: UserManageProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
