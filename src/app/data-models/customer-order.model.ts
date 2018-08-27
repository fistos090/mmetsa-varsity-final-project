import { Time } from "@angular/common";

export class CustomerOrder{
    id: number;
    custID: number;
    shippingCost: number;
    custOrderDate: Date;
    custOrderTime: number;
    orderStatus: string;
}