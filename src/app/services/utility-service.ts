import { Injectable } from "@angular/core";
import * as moment from 'moment';

@Injectable()
export class UtilService {


    formErrors = {
        email: {
            required: 'Email is required field',
            pattern: 'Please enter a valid email address',
            invalidEmailDomain: 'Unkown email domain'
        },
        // username: {},
        password: {
            required: 'Password is required field',
            minlength: 'Password must be a minimun of 7 characters long'
        },
        confirmPassword: {
            required: 'Confirm password is required',
            minlength: 'Confirm password must be a minimun of 7 characters long',
            notMatching: 'Confirm password is not the same as password'
        },
        firstname: {
            required: 'First name is required',
            pattern: 'First name is invalid'
        },
        lastname: {
            required: 'Last name is required',
            pattern: 'Last name is invalid'
        },
        cellphonNumber: {
            required: 'Cellphone number is required',
            minlength: 'Cellphone number must be at least 10 digit long',
            pattern: 'Cell number must be digits only',
            isValidCellCode: 'Unkown South African cell code'
        },
        securityQuestuion: {
            required: 'Provide question for the answer provided',
            pattern: 'Question can be numbers or letters'
        },
        answer: {
            required: 'Provide answer to the security question provided',
            pattern: 'Answer can be numbers or letters'
        },
        gender: {
            required: 'Gender is required field'
        },
        dateOfBirth: {
            required: 'Date of birth is required'
        }
    }

    formControlsProperties = {
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        confirmPassword: '',
        cellphonNumber: '',
        securityQuestuion: '',
        answer: '',
        gender: '',
        dateOfBirth: '',
    
        showErrors: false
      };

    formatDateAndTime(date: Date) {
        return moment(date).format('DD/MM/YYYY, HH:MM:SS');
    }

    formatDateAndTime2(date: string) {
        return moment(date).format('DD/MM/YYYY, HH:MM:SS');
    }

    formatDate(date: string) {
        return moment(date).format('DD MMMM YYYY');
    }

    formatDate1(date: string) {
        return moment(date).format('DD/MMMM/YYYY');
    }

    getCustomerFormErrorMessage(): any {
        return this.formErrors;
    }

    getFormControlsProperties(): any {
        return this.formControlsProperties;
    }

}
