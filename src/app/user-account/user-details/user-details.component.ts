import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input() stepControl: any;
  @Input() title: string;

  regFormGroup: FormGroup;
  formErrors = {
    email: {
      required: 'Email is required field',
      invalidEmail: 'Please enter a valid email address',
      maxlength: 'Email address is too long'
    },
    username: {
    
    },
    password: {
      required: 'Password is required field'
    },
    confirmPassword: {
      required: 'Confirm password is required'
    },
    firstname: {
      required: 'First name is required'
    },
    lastname: {
      required: 'Last name is required'
    },
    cellphonNumber: {
      required: 'Cellphone number is required',
      minlength: 'Cellphone number must be at least 10 digit long'
    },
    securityQuestuion: {

    },
    answer: {
      required: 'Provide answer to your security question'
    },
    gender: {

    },
    dateOfBirth: {

    }
  }

  formControlErrorMessage = {
    email: '',
    username: '',
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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.regFormGroup = this.formBuilder.group({
      email: ['', [Validators.required,Validators.maxLength(50)]],
      username: ['', []],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      cellphonNumber: ['', [Validators.required, Validators.minLength(10)]],
      gender: ['',[]],
      dateOfBirth: ['',[]],
      securityQuestuion: ['',[]],
      answer: ['',[]]
    });

    this.regFormGroup.controls['securityQuestuion'].valueChanges.subscribe((controlValue)=>{
      if(controlValue && controlValue !== ''){
        console.log('setting vali')
        this.regFormGroup.controls['answer'].setValidators([Validators.required]);
        this.regFormGroup.controls['answer'].updateValueAndValidity();
      }
    });

    this.regFormGroup.valueChanges.subscribe(()=>{this.onSubmit()});

  }

  onSubmit(): void {
    const form = this.regFormGroup;
    const formControls = this.regFormGroup.controls;

    for(const control in formControls){
      if(form.controls[control].invalid){
        for(const errorKey in form.controls[control].errors){
          if(!this.formControlErrorMessage[control] || 
            this.formControlErrorMessage[control] !== this.formErrors[control][errorKey]){
            console.log(errorKey+' '+this.formErrors[control][errorKey])
            this.formControlErrorMessage[control] = this.formErrors[control][errorKey];
          }
        }
        
      }
    }

  }

  register(){
    this.formControlErrorMessage.showErrors = true;
    this.onSubmit();
    console.log('form data', this.regFormGroup.value);
  }

  resetForm(){
    this.regFormGroup.reset();
    this.formControlErrorMessage.showErrors = false;
  }
}
