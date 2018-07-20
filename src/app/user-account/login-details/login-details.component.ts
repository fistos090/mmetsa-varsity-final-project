import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LogonUser } from '../../data-models/logon-user.model';

@Component({
  selector: 'app-login-details',
  templateUrl: './login-details.component.html',
  styleUrls: ['./login-details.component.css']
})
export class LoginDetailsComponent implements OnInit {

  @Input() title: string;
  loginForm: FormGroup;
  showErrors = false;
  placeholder = '';

  formErrors = {
    email: {
      required: 'Email is required field to login',
      invalidEmail: 'Please enter a valid email address'
    },
    password: {
      required: 'Password is required field to login'
    }
  }

  formControlErrorMessage = {
    email:'',
    password: '',
    showErrors: false
  }

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }

  ngOnInit() {

  }

  onSubmit(): void {
    const form = this.loginForm;
    const formControls = this.loginForm.controls;

    for(const control in formControls){
      if(form.controls[control].invalid){
        for(const errorKey in form.controls[control].errors){
          if(!this.formControlErrorMessage[control]){
            this.formControlErrorMessage[control] = this.formErrors[control][errorKey];
          }
        }
        
      }
    }

  }

  onLoginClick(): void {

    this.showErrors = true;
    this.onSubmit();

    if(this.loginForm.valid){
      this.httpClient.post<LogonUser>('http://abc:8080/cccc',this.loginForm.value).subscribe(response =>{
        console.log(response)
        
      },error =>{
        console.log(error)
      });
    }

  }

  onResetClick(): void {
    this.loginForm.reset();
    this.showErrors = false;
  }


}
