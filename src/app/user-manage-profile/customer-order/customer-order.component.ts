import { ProductWrapper } from './../../data-models/product-wrapper-model';
import { Component, Input, OnInit } from "@angular/core";
import { CustomerOrder } from "../../data-models/customer-order.model";
import { HttpClient } from "@angular/common/http";
import { UtilService } from '../../services/utility-service';

@Component({
    selector: 'co-component',
    templateUrl: './customer-order.component.html',
    styleUrls: ['./customer-order.component.css']
})
export class CustomerOrderComponent implements OnInit {
    ngOnInit(): void {
       
    }

    @Input() cusOrder: CustomerOrder;

    viewId = -1;
    spinnerIsShowing = false;
    orderProducts: ProductWrapper[];
    results;

    //ps = [1,2,3]

    constructor(private httpClient: HttpClient, public util: UtilService) {
        // this.cusOrder.custID = 1
        // this.cusOrder.custOrderDate = new Date();
        // this.cusOrder.custOrderTime = new Date().getTime();
        // this.cusOrder.shippingCost = 55.54;
        // this.cusOrder.id = 1;
        // this.util.formatDateAndTime2();
    }

    viewOrderDetails(orderId: number) {
        this.viewId = this.viewId === 1 ? -1 : 1;
        let subscription;

        if (this.viewId === 1) {
            this.spinnerIsShowing = true;
            subscription = this.httpClient.get<ProductWrapper[]>('/BAKERY/getCustomerOrderProducts/' + orderId).subscribe(
                (response) => {
                    this.spinnerIsShowing = false;
                    if (response) {
                        this.orderProducts = response['orderProducts'];
                        this.results = response;
                    }
                    if (subscription) {
                        subscription.unsubscribe();
                    }
                },
                (error) => {
                    console.log(error);
                    if (subscription) {
                        subscription.unsubscribe();
                    }
                }
            );
        } else {
            this.orderProducts = undefined;
            if (subscription) {
                subscription.unsubscribe();
            }
        }

    }

}