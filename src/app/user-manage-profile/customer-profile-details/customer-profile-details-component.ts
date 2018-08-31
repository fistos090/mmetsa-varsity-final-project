import { Component, Input, OnInit } from "@angular/core";
import { Customer } from "../../data-models/customer.model";
import { UtilService } from "../../services/utility-service";
import * as $ from 'jquery';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from "@angular/forms";
import { CustomValidations } from "../../services/custom-validations";

@Component({
    selector: 'cp-details-component',
    styleUrls: ['./customer-profile-details-component.css'],
    templateUrl: './customer-profile-details-component.html'
})
export class CustomerProfileDetailsComponent implements OnInit {

    @Input() data: any;
    @Input() details: Details;

    isDetailsOpen = false;
    editDetails = false;
    viewDetailsValues: { label: string, value: string }[];


    updateFormGroup: FormGroup;
    formErrors: any;
    formControlErrorMessage: any;
    title: string;
    showErrors = false;

    constructor(public util: UtilService, private formBuilder: FormBuilder) {
        this.formErrors = this.util.getCustomerFormErrorMessage();
        this.formControlErrorMessage = util.getFormControlsProperties();

        this.updateFormGroup = this.formBuilder.group({

            firstname: ['', [Validators.required, Validators.pattern(/^(?![ ]+$)[a-zA-Z0-9 ]+$/)]],
            lastname: ['', [Validators.required, Validators.pattern(/^(?![ ]+$)[a-zA-Z0-9 ]+$/)]],
            gender: ['', [Validators.required]],
            dateOfBirth: ['', [Validators.required]],
            cellphonNumber: ['', [CustomValidations.isValidCellCode, Validators.required, Validators.minLength(10), Validators.pattern(/^[0-9]+$/)]],

            email: ['', [CustomValidations.isValidEmailDomain, Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
            password: ['', [Validators.required, Validators.minLength(7)]],

            securityQuestuion: ['', [Validators.required, Validators.pattern(/^(?![ ]+$)[a-zA-Z0-9 ]+$/)]],
            answer: ['', [Validators.required, Validators.pattern(/^(?![ ]+$)[a-zA-Z0-9 ]+$/)]]
        });

        this.updateFormGroup.addControl('confirmPassword', new FormControl('', {
            validators: [Validators.required, this.validatePassword()],
            updateOn: 'change'
        }));

        this.updateFormGroup.valueChanges.subscribe(() => {
            this.onSubmit();
        });
        console.log('*******&&&&&&*******', this.updateFormGroup)
        // switch (this.details.detailsType) {
        //     case 'PD':
        //         this.updateFormGroup = this.formBuilder.group({

        //             firstname: ['', [Validators.required, Validators.pattern(/^(?![ ]+$)[a-zA-Z0-9 ]+$/)]],
        //             lastname: ['', [Validators.required, Validators.pattern(/^(?![ ]+$)[a-zA-Z0-9 ]+$/)]],
        //             gender: ['', [Validators.required]],
        //             dateOfBirth: ['', [Validators.required]],
        //             cellphonNumber: ['', [CustomValidations.isValidCellCode, Validators.required, Validators.minLength(10), Validators.pattern(/^[0-9]+$/)]],

        //             email: ['', [CustomValidations.isValidEmailDomain, Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
        //             password: ['', [Validators.required, Validators.minLength(7)]],

        //             securityQuestuion: ['', [Validators.required, Validators.pattern(/^(?![ ]+$)[a-zA-Z0-9 ]+$/)]],
        //             answer: ['', [Validators.required, Validators.pattern(/^(?![ ]+$)[a-zA-Z0-9 ]+$/)]]
        //         });

        //         break;
        //     case 'AC':

        //         this.updateFormGroup = this.formBuilder.group({
        //             email: ['', [CustomValidations.isValidEmailDomain, Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
        //             password: ['', [Validators.required, Validators.minLength(7)]],
        //         });


        //         break;
        //     case 'PRP':
        //         this.updateFormGroup = this.formBuilder.group({
        //             securityQuestuion: ['', [Validators.required, Validators.pattern(/^(?![ ]+$)[a-zA-Z0-9 ]+$/)]],
        //             answer: ['', [Validators.required, Validators.pattern(/^(?![ ]+$)[a-zA-Z0-9 ]+$/)]]
        //         });
        //         break;
        // }
    }

    ngOnInit(): void {

        if (this.details) {
            switch (this.details.detailsType) {
                case 'PD':
                    this.title = 'Personal details';
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
                                value: this.util.formatDate(this.details.customer.dateOfBirth)
                            },
                            {
                                label: 'Gender',
                                value: this.details.customer.gender
                            },
                            {
                                label: 'Cell number',
                                value: this.details.customer.cellphonNumber
                            }

                        ];

                        this.updateFormGroup.get('firstname').setValue(this.details.customer.firstname);
                        this.updateFormGroup.get('lastname').setValue(this.details.customer.lastname);
                        this.updateFormGroup.get('dateOfBirth').setValue(new Date(this.details.customer.dateOfBirth));
                        this.updateFormGroup.get('gender').setValue(this.details.customer.gender);
                        this.updateFormGroup.get('cellphonNumber').setValue(this.details.customer.cellphonNumber);
                    }
                    break;
                case 'AC':
                    this.title = 'Credentials details';
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

                        ];

                        this.updateFormGroup.get('email').setValue(this.details.customer.email);
                        this.updateFormGroup.get('password').setValue(this.details.customer.password);
                    }

                    break;
                case 'PRP':
                    this.title = 'Recovery details';
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

                        ];

                        this.updateFormGroup.get('securityQuestuion').setValue(this.details.customer.securityQuestuion);
                        this.updateFormGroup.get('answer').setValue(this.details.customer.answer);
                    }
                    break;
            }
        }
    }

    validatePassword() {
        return (control: AbstractControl) => {
            const confirmPassword = control.value;
            const password = this.updateFormGroup.controls['password'].value;

            if (confirmPassword !== password) {
                return { notMatching: false };
            }

        }
    }

    onSubmit(): void {
        const form = this.updateFormGroup;
        const formControls = this.updateFormGroup.controls;
    
        for (const control in formControls) {
          if (form.controls[control].invalid) {
            for (const errorKey in form.controls[control].errors) {
              if (!this.formControlErrorMessage[control] ||
                this.formControlErrorMessage[control] !== this.formErrors[control][errorKey]) {
                console.log(errorKey + ' ' + this.formErrors[control][errorKey])
                this.formControlErrorMessage[control] = this.formErrors[control][errorKey];
              }
            }
    
          }
        }
    
      }

    update() {
        this.showErrors = true;
        this. onSubmit();
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

    viewDetails(state?: boolean): void {

        this.isDetailsOpen = state || !this.isDetailsOpen;
        $("#two").fadeOut(700, () => {
            this.editDetails = false;
        });
    }

    edit(): void {
        // 

        // $(document).ready(function(){
        // $("button").click(function(){
        console.log('$("#ur-details")', $("#ur-details"))
        $("#one").fadeOut(700, () => {
            this.editDetails = true;
        });
        // });
        // });
    }
}

export interface Details {
    detailsType: string;
    customer: Customer;
}