import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppAngularMaterialModule } from './app-angular-material.module';
import { TopnavMenuComponent } from './topnav-menu/topnav-menu.component';
import { InstantMessagingComponent } from './instant-messaging/instant-messaging.component';
import { HomeComponent } from './home/home.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { UserDetailsComponent } from './user-account/user-details/user-details.component';
import { TabsMenuComponent } from './tabs-menu/tabs-menu.component';
import { TabPanelComponent } from './tabs-menu/tab-panel/tab-panel.component';
import { LoginDetailsComponent } from './user-account/login-details/login-details.component';
import { InputFieldComponent } from './user-account/input-field/input-field.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BakeryLogoComponent } from './bakery-logo/bakery-logo.component';
import { ProductComponent } from './product/product.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { ProductsLoaderComponent } from './category-page/products-loader/products-loader.component';
import { ShoppingBusketComponent } from './shopping-basket/shopping-basket.component';
import { ShoppingBascketService } from './shopping-basket/shopping-basket-service';
import { SpecialsPageComponent } from './specials-page/specials-page.component';





@NgModule({
  declarations: [
    AppComponent,
    TopnavMenuComponent,
    InstantMessagingComponent,
    HomeComponent,
    UserAccountComponent,
    UserDetailsComponent,
    TabsMenuComponent,
    TabPanelComponent,
    LoginDetailsComponent,
    InputFieldComponent,
    BakeryLogoComponent,
    ProductComponent,
    CategoryPageComponent,
    ProductsLoaderComponent,
    ShoppingBusketComponent,
    SpecialsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppAngularMaterialModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule, InputsModule, ButtonsModule

  ],
  providers: [HttpClient, ShoppingBascketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
