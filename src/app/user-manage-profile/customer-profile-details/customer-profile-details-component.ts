import { Component, Input, OnInit } from "@angular/core";
import { Customer } from "../../data-models/customer.model";
import { UtilService } from "../../services/utility-service";
import * as $ from 'jquery';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from "@angular/forms";
import { CustomValidations } from "../../services/custom-validations";
import { SpinnerService } from "../../service-spinner/spinner-service";
import { HttpClient } from "@angular/common/http";
import { LogonUser } from "../../data-models/logon-user.model";

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

    constructor(public util: UtilService, private formBuilder: FormBuilder, private spinner: SpinnerService, private httpClient: HttpClient) {
        this.formErrors = this.util.getCustomerFormErrorMessage();
        this.formControlErrorMessage = util.getFormControlsProperties();

        this.updateFormGroup = this.formBuilder.group({
            id:[],
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

        this.updateFormGroup.controls['password'].valueChanges.subscribe((controlValue: string) => {
            const control = this.updateFormGroup.controls['confirmPassword'];

            if (control.value) {
                control.updateValueAndValidity();
            }
            //this.passwordStatus = this.testStrongness(controlValue);
        });
    }

    ngOnInit(): void {

        if (this.details) {
            switch (this.details.detailsType) {
                case 'PD':
                    this.title = 'Personal details';
                    if (this.details.userLogon.userIn) {
                        this.viewDetailsValues = [
                            {
                                label: 'Firstname',
                                value: this.details.userLogon.userIn.firstname
                            },
                            {
                                label: 'Lastname',
                                value: this.details.userLogon.userIn.lastname
                            },
                            {
                                label: 'Date of birth',
                                value: this.util.formatDate(this.details.userLogon.userIn.dateOfBirth)
                            },
                            {
                                label: 'Gender',
                                value: this.details.userLogon.userIn.gender
                            },
                            {
                                label: 'Cell number',
                                value: this.details.userLogon.userIn.cellphonNumber
                            }

                        ];

                        this.updateFormGroup.get('firstname').setValue(this.details.userLogon.userIn.firstname);
                        this.updateFormGroup.get('lastname').setValue(this.details.userLogon.userIn.lastname);
                        this.updateFormGroup.get('dateOfBirth').setValue(new Date(this.details.userLogon.userIn.dateOfBirth));
                        this.updateFormGroup.get('gender').setValue(this.details.userLogon.userIn.gender);
                        this.updateFormGroup.get('cellphonNumber').setValue(this.details.userLogon.userIn.cellphonNumber);
                    }
                    break;
                case 'AC':
                    this.title = 'Credentials details';
                    if (this.details.userLogon.userIn) {
                        this.viewDetailsValues = [
                            {
                                label: 'Email',
                                value: this.details.userLogon.userIn.email
                            },
                            {
                                label: 'Password',
                                value: this.maskData(this.details.userLogon.userIn.password)
                            }

                        ];

                        this.updateFormGroup.get('email').setValue(this.details.userLogon.userIn.email);
                        this.updateFormGroup.get('password').setValue(this.details.userLogon.userIn.password);
                    }

                    break;
                case 'PRP':
                    this.title = 'Recovery details';
                    if (this.details.userLogon.userIn) {
                        this.viewDetailsValues = [
                            {
                                label: 'Password recovery question',
                                value: this.details.userLogon.userIn.securityQuestuion
                            },
                            {
                                label: 'Password recovery answer',
                                value: this.maskData(this.details.userLogon.userIn.answer)
                            }

                        ];

                        this.updateFormGroup.get('securityQuestuion').setValue(this.details.userLogon.userIn.securityQuestuion);
                        this.updateFormGroup.get('answer').setValue(this.details.userLogon.userIn.answer);
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
        this.onSubmit();

        
        if (this.updateFormGroup.valid) {

            const customer = { 
                id: this.updateFormGroup.get('id').value || this.details.userLogon.userIn.id,
                firstname: this.updateFormGroup.get('firstname').value || this.details.userLogon.userIn.firstname,
                lastname: this.updateFormGroup.get('lastname').value || this.details.userLogon.userIn.lastname,
                email: this.updateFormGroup.get('email').value || this.details.userLogon.userIn.email,
                password: this.updateFormGroup.get('password').value || this.details.userLogon.userIn.password,
                cellphonNumber: this.updateFormGroup.get('cellphonNumber').value || this.details.userLogon.userIn.cellphonNumber,
                gender: this.updateFormGroup.get('gender').value || this.details.userLogon.userIn.gender,
                dateOfBirth: this.updateFormGroup.get('dateOfBirth').value || this.details.userLogon.userIn.dateOfBirth,
                securityQuestuion: this.updateFormGroup.get('securityQuestuion').value || this.details.userLogon.userIn.securityQuestuion,
                answer: this.updateFormGroup.get('answer').value || this.details.userLogon.userIn.answer
             }

            this.spinner.showSpinner();
            this.httpClient.post('/BAKERY/customer/updateProfile/' + this.details.userLogon.sessionID, customer).subscribe(
                (response) => {
                    this.spinner.hideSpinner();
                    if (response) {
                        alert(response['message']);
                        const status = String(response['status']);

                        if (status === 'FOUND') {

                            // this.logonUserService.setLogonUser(response['auto_logon']);
                            // this.openPopup(response['message'], 'OK').subscribe(() => {
                            //   this.router.navigate(['home']);
                            // });

                        } else if (status === 'NOT_FOUND') {

                            // this.openPopup(response['message'] + ' Continue to log in', 'Yes').subscribe(() => {
                            //   this.childEvent.emit({ 'tabId': 1, 'email': this.data.email });
                            // });

                        }

                    }

                },
                (error) => {
                    console.log(error);
                    this.spinner.hideSpinner();

                });
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

    viewDetails(state?: boolean): void {

        this.isDetailsOpen = state || !this.isDetailsOpen;
        $("#two" + this.details.detailsType).fadeOut(700, () => {
            this.editDetails = false;
        });
    }

    edit(): void {

        $("#one" + this.details.detailsType).fadeOut(700, () => {
            this.editDetails = true;
        });
    }
}

export interface Details {
    detailsType: string;
    userLogon: LogonUser;
}