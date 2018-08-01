import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
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
      pattern: 'Please enter a valid email address'
    },
    // username: {},
    password: {
      required: 'Password is required field',
      minlength: 'Password must be a minimun of 7 characters long'
    },
    confirmPassword: {
      required: 'Confirm password is required',
      minlength: 'Confirm password must be a minimun of 7 characters long'
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
      pattern: 'Cell number must be digits only'

    },
    securityQuestuion: {

    },
    answer: {
      required: 'Provide answer to your security question'
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

  ngOnInit() {
    this.regFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      // username: ['', []],
      firstname: ['', [Validators.required,Validators.pattern(/^(?![ ]+$)[a-zA-Z0-9 ]+$/)]],
      lastname: ['', [Validators.required,Validators.pattern(/^(?![ ]+$)[a-zA-Z0-9 ]+$/)]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(7)]],
      cellphonNumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^[0-9]+$/)]],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      securityQuestuion: ['', []],
      answer: ['', []]
    });

    if (this.data) {
      this.regFormGroup.patchValue(this.data);
    }

    this.regFormGroup.controls['securityQuestuion'].valueChanges.subscribe((controlValue) => {
      if (controlValue && controlValue !== '') {
        console.log('setting vali')
        this.regFormGroup.controls['answer'].setValidators([Validators.required]);
        this.regFormGroup.controls['answer'].updateValueAndValidity();
      }
    });

    this.regFormGroup.controls['password'].valueChanges.subscribe((controlValue: string) => {

      if (controlValue) {
        // Check for upper case
        controlValue
        
        // Check for number

        // Check for special charecter
      }

    });

    this.regFormGroup.controls['confirmPassword'].valueChanges.subscribe((controlValue) => {

    });

    this.regFormGroup.valueChanges.subscribe(() => { this.onSubmit() });

  }

  ngAfterViewInit(): void {
    window.scroll(0,0);
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
      this.stepper.stepperEvent.next({stepNumber: 2, data: this.regFormGroup.value});
    } else {
      window.scroll(0,0);
    }
    
  }

  resetForm() {
    this.regFormGroup.reset();
    this.showErrors = false;
  }
}
const NAME_REGEXP = /^(?![ ]+$)[a-zA-Z0-9 ]+$/;

export class Validation {
  static isValidName(control: AbstractControl) {
    if ((!NAME_REGEXP.test(control.value))) {
      return { 'invalidName': true };
    }
    return null;
  }
}
