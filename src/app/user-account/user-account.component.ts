import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Tab } from '../tabs-menu/tabs-menu.model';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  pageTitle = 'Register a new account'
  selectedIndex = 0;
  tabs: Tab[]

  constructor(private route: ActivatedRoute) {
    this.tabs = [
      new Tab({
        tabId: 0,
        tabTitle: 'Register'
      }),
      new Tab({
        tabId: 1,
        tabTitle: 'Login'
      }),
    ]
   }

  ngOnInit() {

    this.route.params.subscribe(routeParams => {
      //const routeParam = +routeParams['tabID'];
      //alert(routeParam)
      if (!isNaN(+routeParams['tabID'])) {
        //alert(routeParam)
        this.selectedIndex = +routeParams['tabID'];
      }
      this.setPageTitle(this.selectedIndex);
    })
  }

  onTabChange(tabId: number) {
    this.setPageTitle(tabId);
  }

  setPageTitle(tabId: number) {
    switch (tabId) {
      case 0:
        this.pageTitle = 'Register a new account';
        break;
      case 1:
        this.pageTitle = 'Login to existing account';
        break;
    }
  }

}
