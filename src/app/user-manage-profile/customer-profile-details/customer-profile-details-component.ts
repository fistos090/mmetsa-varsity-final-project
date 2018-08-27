import { Component, Input, OnInit } from "@angular/core";
import { Customer } from "../../data-models/customer.model";

@Component({
    selector: 'cp-details-component',
    styleUrls: ['./customer-profile-details-component.css'],
    templateUrl: './customer-profile-details-component.html'
})
export class CustomerProfileDetailsComponent implements OnInit {

    @Input() data: any;
    @Input() details: Details;

    isDetailsOpen = false;
    viewDetailsValues: { label: string, value: string }[];

    constructor() {

    }

    ngOnInit(): void {

        if (this.details) {
            switch (this.details.detailsType) {
                case 'PD':
                    if (this.details.customer) {
                        this.viewDetailsValues = [
                            {
                                label: 'Firstname',
                                value: this.details.customer.firstname
                            },
                            {
                                label: 'Lastname',
                                value: this.details.customer.lastname
                            },
                            {
                                label: 'Date of birth',
                                value: this.details.customer.dateOfBirth
                            },
                            {
                                label: 'Gender',
                                value: this.details.customer.gender
                            },
                            {
                                label: 'Cell number',
                                value: this.details.customer.cellphonNumber
                            },
                            {
                                label: 'Email',
                                value: this.details.customer.email
                            },

                        ]
                    }
                    break;
                case 'AC':
                    if (this.details.customer) {
                        this.viewDetailsValues = [
                            {
                                label: 'Email',
                                value: this.details.customer.email
                            },
                            {
                                label: 'Password',
                                value: this.maskData(this.details.customer.password)
                            }

                        ]
                    }

                    break;
                case 'PRP':
                    if (this.details.customer) {
                        this.viewDetailsValues = [
                            {
                                label: 'Password recovery question',
                                value: this.details.customer.securityQuestuion
                            },
                            {
                                label: 'Password recovery answer',
                                value: this.maskData(this.details.customer.answer)
                            }

                        ]
                    }
                    break;
            }
        }
    }
    maskData(value: string): any {
        let temp = '';
        let counter = 0;

        if (value.length > 0 && value.length < 3) {
            switch (value.length) {
                case 1:
                    temp = '*';
                    break;
                case 2:
                    temp = '**';
                    break;
            }
        } else {
            for (let x = 0; x < value.length; x++) {

                if (counter === 0) {
                    temp += value.substr(x, 1);
                } else {
                    temp += '*';

                }


                if (counter === 2) counter = 0; else counter++;
            }
        }

        return temp;
    }

    viewDetails(): void {
        this.isDetailsOpen = !this.isDetailsOpen;
    }

    edit(): void {

    }
}

export interface Details {
    detailsType: string;
    customer: Customer;
}