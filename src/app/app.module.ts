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
import { TabsMenuComponent } from './tabs-menu/tabs-menu.component';
import { TabPanelComponent } from './tabs-menu/tab-panel/tab-panel.component';
import { LoginDetailsComponent } from './user-account/login-details/login-details.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BakeryLogoComponent } from './bakery-logo/bakery-logo.component';
import { ProductComponent } from './product/product.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { ProductsLoaderComponent } from './category-page/products-loader/products-loader.component';
import { ShoppingBusketComponent } from './shopping-basket/shopping-basket.component';
import { ShoppingBascketService } from './shopping-basket/shopping-basket-service';
import { SpecialsPageComponent } from './specials-page/specials-page.component';
import { ServiceSpinnerComponent } from './service-spinner/service-spinner.component';
import { SpinnerService } from './service-spinner/spinner-service';
import { UserConfirmComponent } from './user-account/register/user-confirm/user-confirm.component';
import { UserDetailsComponent } from './user-account/register/user-details/user-details.component';
import { UserService } from './user-account/register/user-details/user-service';
import { InputFieldComponent } from './user-account/form-controls/input-field/input-field.component';
import { DropdownListComponent } from './user-account/form-controls/dropdown-list/dropdown-list.component';
import { DobDatePickerComponent } from './user-account/form-controls/dob-date-picker/dob-date-picker.component';
import { RadioGroupComponent } from './user-account/form-controls/radio-group/radio-group.component';
import { UserManageProfileComponent } from './user-manage-profile/user-manage-profile';
import { CustomerOrderComponent } from './user-manage-profile/customer-order/customer-order.component';





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
    SpecialsPageComponent,
    ServiceSpinnerComponent,
    RadioGroupComponent,
    UserConfirmComponent,
    DropdownListComponent,
    DobDatePickerComponent,
    UserManageProfileComponent,
    CustomerOrderComponent
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
  entryComponents: [
    ServiceSpinnerComponent
  ],
  providers: [HttpClient, ShoppingBascketService, SpinnerService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
