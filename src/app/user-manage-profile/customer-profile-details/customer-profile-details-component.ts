import { Component, Input } from "@angular/core";

@Component({
    selector: 'cp-details-component',
    styleUrls: ['./customer-profile-details-component.css'],
    templateUrl: './customer-profile-details-component.html'
})
export class CustomerProfileDetailsComponent{
    @Input() data: any;
    isDetailsOpen = false;

    constructor(){

    }

    viewDetails(){
        this.isDetailsOpen = !this.isDetailsOpen;
    }
}