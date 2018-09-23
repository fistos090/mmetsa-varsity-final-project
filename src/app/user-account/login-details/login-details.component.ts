import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LogonUser } from '../../data-models/logon-user.model';
import { SpinnerService } from '../../service-spinner/spinner-service';
import { Router } from '@angular/router';
import { UserService } from '../register/user-details/user-service';

@Component({
  selector: 'app-login-details',
  templateUrl: './login-details.component.html',
  styleUrls: ['./login-details.component.css']
})
export class LoginDetailsComponent implements OnInit, OnChanges {

  @Input() title: string;
  @Input() data: any;

  loginForm: FormGroup;
  showErrors = false;
  placeholder = '';
  failureMessage = '';

  formErrors = {
    email: {
      required: 'Email is required field to login',
      pattern: 'Please enter a valid email address'
    },
    password: {
      required: 'Password is required field to login'
    }
  };

  formControlErrorMessage = {
    email: '',
    password: '',
    showErrors: false
  };

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router,
    private logonUserService: UserService, private spinner: SpinnerService) {

  }

  ngOnInit() {


    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      password: ['', [Validators.required]]
    });

    this.loginForm.valueChanges.subscribe(
      () => {
        this.failureMessage = '';
        this.onSubmit();
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.data) {
      this.loginForm.controls['email'].setValue(this.data['email']);
    }
  }

  onSubmit(): void {
    const form = this.loginForm;
    const formControls = this.loginForm.controls;

    for (const control in formControls) {
      if (form.controls[control].invalid) {
        for (const errorKey in form.controls[control].errors) {
          if (!this.formControlErrorMessage[control]) {
            this.formControlErrorMessage[control] = this.formErrors[control][errorKey];
          }
        }

      }
    }
  }

  onLoginClick(): void {

    this.showErrors = true;
    this.onSubmit();

    if (this.loginForm.valid) {
      this.failureMessage = '';
      this.spinner.showSpinner();
      this.httpClient.post<LogonUser>('/BAKERY/customer/login', this.loginForm.value).subscribe(
        (response) => {
          if (response) {
            // alert(response['message']);
            if (response['status'] === 'FOUND') {
              this.logonUserService.setLogonUser(response);

              let redirectData = this.logonUserService.getRedirectData();
              if (redirectData) {
                this.router.navigate([redirectData.toUrl]);
              } else {
                // If no specific path privided
                this.router.navigate(['manage-profile']);
              }


            } else if (response['status'] === 'NOT_FOUND') {
              this.failureMessage = response['message'];
            }

          }
          this.spinner.hideSpinner();
        },
        (error) => {
          console.log(error);
          this.spinner.hideSpinner();
        }
      );
    }
  }

  onResetClick(): void {
    this.loginForm.reset();
    this.showErrors = false;
  }

}
