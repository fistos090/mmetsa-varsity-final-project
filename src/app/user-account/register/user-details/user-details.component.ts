import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { HttpClient } from '../../../../../node_modules/@angular/common/http';
import { UserService } from './user-service';
import { Router } from '../../../../../node_modules/@angular/router';
import { RegisterStepperService } from '../register-stepper.service';
import { Customer } from '../../../data-models/customer.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, AfterViewInit {

  @Input() stepControl: any;
  @Input() title: string;
  @Input() data: Customer;

  showErrors = false;
  regFormGroup: FormGroup;
  formErrors = {
    email: {
      required: 'Email is required field',
      pattern: 'Please enter a valid email address',
      invalidEmailSurfix: 'Unkown email surfix'
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

  formControlErrorMessage = {
    email: '',
    // username: '',
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
  }

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient,
    private logonUserService: UserService, private router: Router, private stepper: RegisterStepperService) { }

  validatePassword() {
    return (control: AbstractControl) => {
      const confirmPassword = control.value;
      const password = this.regFormGroup.controls['password'].value;

      if (confirmPassword !== password) {
        return { notMatching: false };
      }

    }
  }

  ngOnInit() {
    this.regFormGroup = this.formBuilder.group({
      // Validation.isValidEmailSurfix, 
      email: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      firstname: ['', [Validators.required, Validators.pattern(/^(?![ ]+$)[a-zA-Z0-9 ]+$/)]],
      lastname: ['', [Validators.required, Validators.pattern(/^(?![ ]+$)[a-zA-Z0-9 ]+$/)]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      cellphonNumber: ['', [Validation.isValidCellCode, Validators.required, Validators.minLength(10), Validators.pattern(/^[0-9]+$/)]],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      securityQuestuion: ['', [Validators.required, Validators.pattern(/^(?![ ]+$)[a-zA-Z0-9 ]+$/)]],
      answer: ['', [Validators.required, Validators.pattern(/^(?![ ]+$)[a-zA-Z0-9 ]+$/)]]
    });

    this.regFormGroup.addControl('confirmPassword', new FormControl('',{
      validators: [Validators.required, this.validatePassword()],
      updateOn: 'change'
    }));

    if (this.data) {
      this.regFormGroup.patchValue(this.data);
    }

    this.regFormGroup.controls['securityQuestuion'].valueChanges.subscribe((controlValue) => {
      
    });

    this.regFormGroup.controls['answer'].valueChanges.subscribe((controlValue) => {

    });

    this.regFormGroup.controls['password'].valueChanges.subscribe((controlValue: string) => {
      const control = this.regFormGroup.controls['confirmPassword'];
      
      if (control.value) {
        control.updateValueAndValidity();
      }
      this.passwordStatus = this.testStrongness(controlValue);
    });

    this.regFormGroup.controls['confirmPassword'].valueChanges.subscribe((controlValue) => {
      this.testStrongness(controlValue);
    });

    this.regFormGroup.valueChanges.subscribe(() => { this.onSubmit() });

  }
passwordStatus: string
  testStrongness(controlValue: string): string {
    
    const strongness = ['Weak','Medium','Strong']
    let hasUpperCase = false;
    let hasLowerCase = false;
    let hasSpecialCase = false;

    let testCounter = -1;

    if (controlValue) {
      // Check for upper case
      for (let x = 0; x < controlValue.length; x++) {
        const code = controlValue.charCodeAt(x);

        if(!hasUpperCase && (code >= 65 && code <= 90)) {
          hasUpperCase = true;
          testCounter++;
        }

        if(!hasLowerCase && (code >= 97 && code <= 121)) {
          hasLowerCase = true;
          testCounter++;
        }

        if(!hasSpecialCase && !(code >= 97 && code <= 121) && !(code >= 65 && code <= 90)) {
          hasSpecialCase = true;
          testCounter++;
        }

        if( testCounter === 3){
          break;
        }
      }

    }

    return strongness[testCounter];
  }

  ngAfterViewInit(): void {
    window.scroll(0, 0);
  }

  onSubmit(): void {
    const form = this.regFormGroup;
    const formControls = this.regFormGroup.controls;

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

  next() {
    this.showErrors = true;
    this.onSubmit();

    if (this.regFormGroup.valid) {
      this.stepper.stepperEvent.next({ stepNumber: 2, data: this.regFormGroup.value });
    } else {
      window.scroll(0, 0);
    }

  }

  resetForm() {
    this.regFormGroup.reset();
    this.showErrors = false;
  }

}
const NAME_REGEXP = /^(?![ ]+$)[a-zA-Z0-9 ]+$/;
const CELL_CODES = ['071','072','073','074','076','078','079','081','082','083','084','060','064','065'];
const EMAIL_SURFIXS = ['gmail.com','yahoo.com'];

export class Validation {
  static isValidName(control: AbstractControl) {
    if ((!NAME_REGEXP.test(control.value))) {
      return { 'invalidName': true };
    }
    return null;
  }

  static isValidCellCode(control: AbstractControl) {
      if (control) {
        if (control.value) {
          const code = control.value.substr(0,3);
          if ( CELL_CODES.find( cellCode => cellCode === code)  ) {
            return null;
          }
        }
      }

    return { 'isValidCellCode': true };
  }

  static isValidEmailSurfix(control: AbstractControl) {
    if (control) {
      if (control.value) {
        const surfix = control.value.substr(control.value.lastIndexOf('@')+1);
        if ( EMAIL_SURFIXS.find( emailSurfix => emailSurfix === surfix) ) {
          return null;
        }
      }
    }
    return { 'invalidEmailSurfix': true };
  }
}
