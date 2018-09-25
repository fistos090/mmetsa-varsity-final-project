import { CustomerOrder } from './../data-models/customer-order.model';
import { Component, OnInit } from "@angular/core";
import { Customer } from "../data-models/customer.model";
import { UserService } from "../user-account/register/user-details/user-service";
import { LogonUser } from "../data-models/logon-user.model";
import { RegisterStepperService } from "../user-account/register/register-stepper.service";
import { HttpClient } from '@angular/common/http';
import { SpinnerService } from '../service-spinner/spinner-service';

@Component({
    selector: 'user-manage-profile',
    templateUrl: './user-manage-profile.html',
    styleUrls: ['./user-manage-profile.css'],
    providers: [RegisterStepperService]
})
export class UserManageProfileComponent implements OnInit {

    activeId = 0;
    registerActiveId = 1;
    logonUser: LogonUser;
    customer: Customer;
    stepData: Customer;

    openOrders: CustomerOrder[];
    // = [{
    //     "custID": 1,
    //     "custOrderDate": new Date(),
    //     "custOrderTime": new Date().getTime(),
    //     "shippingCost": 55.54,
    //     "id": 1,
    //     'orderStatus': 'OPEN'
    // }, {
    //     "custID": 1,
    //     "custOrderDate": new Date(),
    //     "custOrderTime": new Date().getTime(),
    //     "shippingCost": 55.54,
    //     "id": 1,
    //     'orderStatus': 'OPEN'
    // }];

    closedOrders: CustomerOrder[] = [{
        "custID": 1,
        "custOrderDate": new Date(),
        "custOrderTime": new Date().getTime(),
        "shippingCost": 55.54,
        "id": 1,
        'orderStatus': 'CLOSED'
    }];;

    constructor(private logonUserService: UserService, private stepper: RegisterStepperService,
        private httpClient: HttpClient, private spinner: SpinnerService) {
        this.stepper.stepperEventSource$.subscribe(
            (stepDetails: any) => {
                this.registerActiveId = stepDetails.stepNumber;
                this.stepData = stepDetails.data;
            }
        );

    }

    ngOnInit(): void {
        this.activeId = 1;
        this.logonUser = this.logonUserService.getLogonUser();
        if (this.logonUser) {

            this.customer = this.logonUser.userIn;
            this.customer.dateOfBirth = new Date(this.customer.dateOfBirth).toString();
            this.spinner.showSpinner();

            let subscription = this.httpClient.post<CustomerOrder[]>('/BAKERY/getCustomerOrders/' + this.logonUser.sessionID, this.customer).subscribe(
                (response) => {

                    if (response) {
                        response['customerOrders'];
                        console.log('response[\'customerOrders\']', response['customerOrders']);
                        // alert(response['message']);

                        let orders = response['customerOrders'];

                        if (orders) {
                            orders.forEach((order: CustomerOrder) => {
                                if (order.orderStatus = 'OPEN') {

                                    if(!this.openOrders){
                                        this.openOrders = [order];
                                    } else {
                                        this.openOrders.push(order);
                                    }

                                } else {

                                    if(!this.closedOrders){
                                        this.closedOrders = [order];
                                    } else {
                                        this.closedOrders.push(order);
                                    }
                                }
                            });
                        }
                    }
                    this.spinner.hideSpinner();
                    if (subscription) {
                        subscription.unsubscribe();
                    }
                    
                },
                (error) => {
                    console.log(error);
                    this.spinner.hideSpinner();
                    if (subscription) {
                        subscription.unsubscribe();
                    }
                }
            );

        }

    }

    changeView(viewId: number) {
        this.activeId = viewId;
    }

}