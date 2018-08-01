import { Customer } from './../data-models/customer.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tab } from '../tabs-menu/tabs-menu.model';
import { RegisterStepperService } from './register/register-stepper.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css'],
  providers: [RegisterStepperService]
})
export class UserAccountComponent implements OnInit {

  pageTitle = 'Register a new account'
  selectedIndex = 0;
  loginData: any;
  tabs: Tab[];
  whichTabs = 'both';
  stepData: Customer;

  registerActiveId = 1;


  constructor(private route: ActivatedRoute, private stepper: RegisterStepperService) {

    this.tabs = [
      new Tab({
        tabId: 0,
        tabTitle: 'Register'
      }),
      new Tab({
        tabId: 1,
        tabTitle: 'Login'
      }),
    ];

    this.stepper.stepperEventSource$.subscribe(
      (stepDetails: any) => {
        this.registerActiveId = stepDetails.stepNumber;
        this.stepData = stepDetails.data;
      }
    )
   }

  ngOnInit(): void {

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

  onTabChange(tabId: number): void {
    this.setPageTitle(tabId);
  }

  setPageTitle(tabId: number): void {
    switch (tabId) {
      case 0:
        this.pageTitle = 'Register a new account';
        break;
      case 1:
        this.pageTitle = 'Login to existing account';
        break;
    }
  }

  processChildEvent(data: any): void {
    console.log('darara',data)
    if (data) {
      this.selectedIndex = Number(data["tabId"]);
      this.loginData = {'email': data['email']};
    }
  }

}
