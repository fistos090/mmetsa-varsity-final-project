import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import CircleType from 'circletype';
import { ShoppingBascketService } from '../shopping-basket/shopping-basket-service';
import { UserService } from '../user-account/user-details/user-service';
import { LogonUser } from '../data-models/logon-user.model';
import { SpinnerService } from '../service-spinner/spinner-service';

// declare var jquery:any;
//declare var $ :any;

@Component({
  selector: 'app-topnav-menu',
  templateUrl: './topnav-menu.component.html',
  styleUrls: ['./topnav-menu.component.css']
})
export class TopnavMenuComponent implements OnInit {

  @ViewChild('logo') div: ElementRef;

  showCategoryDropdown = false;
  showLoginDropdown = false;
  activeItem: number;
  user: LogonUser;
  isUserLogon = false;
  itemThreeTitle = 'Register / Login';

  constructor(private router: Router, public bascket: ShoppingBascketService, private spinner: SpinnerService,
    private logonUserService: UserService, private httpClient: HttpClient) {
    //this.bascket.bascketProducts

    this.logonUserService.logonUserEventSource$.subscribe((user: LogonUser) => {
      if (user) {
        this.isUserLogon = true;
        this.itemThreeTitle = user.userIn.firstname.substr(0, 1) + ' ' + user.userIn.lastname;
        this.user = user;
      }
    })
  }



  ngOnInit() {
    // $(window).click(function () {
    //   alert('ok');
    //   });

  }

  markActiveItem(activeItem: number) {
    this.activeItem = activeItem;
    switch (activeItem) {
      case 2:
        this.router.navigate(['specials']);
        break;
      case 3:
        if (!this.isUserLogon) {
          this.router.navigate(['user-account']);
        }
        break;
      case 4:
        this.router.navigate(['shopping-bascket']);
        break;
      case 7:
        this.router.navigate(['home']);
        break;
    }
  }

  navigateToSpecificTab(id: number, event) {
    event.stopPropagation();
    this.activeItem = 3;
    if (id === 0 || id === 1) {
      this.router.navigate(['user-account', id]);
    } else {
      if (id === 3) {
        this.spinner.showSpinner();
        this.httpClient.get('/TAKEALOT/customer/logout/' + this.user.sessionID + '/' + this.user.userIn.id).subscribe(
          (response) => {
            if (response['status'] === 'OK') {
              this.isUserLogon = false;
              this.itemThreeTitle = 'Register / Login';

              this.router.navigate(['home']);
            } else {
              alert(response['status']);
            }
            this.spinner.hideSpinner();
          },
          (error) => {
            console.log('error occurred =>', error);
            this.spinner.hideSpinner();
          }
        );
      } else {
        this.router.navigate(['manage-profile']);
      }
    }

  }

  loadCategory(category) {
    this.router.navigate(['products-category', category]);
  }
}
