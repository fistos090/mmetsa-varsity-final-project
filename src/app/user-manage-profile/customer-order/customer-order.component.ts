import { Component, Input } from "@angular/core";
import { CustomerOrder } from "../../data-models/customer-order.model";

@Component({
    selector: 'co-component',
    templateUrl: './customer-order.component.html',
    styleUrls: ['./customer-order.component.css']
})
export class CustomerOrderComponent {

    @Input() cusOrder: CustomerOrder = {
        "custID": 1,
        "custOrderDate": new Date(),
        "custOrderTime": new Date().getTime(),
        "shippingCost": 55.54,
        "id": 1
    };

    constructor(){
        this.cusOrder.custID = 1
        this.cusOrder.custOrderDate = new Date();
        this.cusOrder.custOrderTime = new Date().getTime();
        this.cusOrder.shippingCost = 55.54;
        this.cusOrder.id = 1;
    }

}