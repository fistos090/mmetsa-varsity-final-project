import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Customer } from '../../../data-models/customer.model';
import { HttpClient } from '../../../../../node_modules/@angular/common/http';
import { UserService } from '../user-details/user-service';
import { Router } from '../../../../../node_modules/@angular/router';
import { RegisterStepperService } from '../register-stepper.service';
import * as moment from 'moment';
import { SpinnerService } from '../../../service-spinner/spinner-service';
import { MatSnackBar } from '../../../../../node_modules/@angular/material';

@Component({
  selector: 'app-user-confirm',
  templateUrl: './user-confirm.component.html',
  styleUrls: ['./user-confirm.component.css']
})
export class UserConfirmComponent implements OnInit, AfterViewInit {


  @Input() data: Customer;
  @Output() childEvent = new EventEmitter<{ tabId: number, email: string }>();

  dateDickerDate: any;
  disableButton = false;

  constructor(private httpClient: HttpClient, private logonUserService: UserService, public snackBar: MatSnackBar,
    private router: Router, private stepper: RegisterStepperService, private spinner: SpinnerService) { }

  ngOnInit() {
    this.dateDickerDate = this.data.dateOfBirth;
    this.data.dateOfBirth = moment(this.data.dateOfBirth).format('DD-MM-YYYY');
  }

  ngAfterViewInit(): void {
    window.scroll(0, 0);
  }

  register() {
    this.disableButton = true;
    this.spinner.showSpinner();
    this.httpClient.post('/TAKEALOT/customer/register', this.data).subscribe(
      (response) => {
        this.spinner.hideSpinner();
        if (response) {
          // alert(response['message']);
          const status = String(response['status']);
          this.openPopup(response['message'], 'OK');
          if (status === 'CREATED') {

            this.logonUserService.setLogonUser(response['auto_logon']);

          } else if (status === 'CONFLICT') {

            this.childEvent.emit({ 'tabId': 1, 'email': this.data.email });
          }

        }

      },
      (error) => {
        console.log(error);
        this.spinner.hideSpinner();

      });
  }

  openPopup(message: string, action: string) {
    const snackBarRef = this.snackBar.open(message, action);

    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['home']);
    });

    snackBarRef.afterDismissed().subscribe(() => {

    });

    //  { duration: 2000 }
  }
  back() {
    this.data.dateOfBirth = this.dateDickerDate;
    this.stepper.stepperEvent.next({ 'stepNumber': 1, 'data': this.data });
  }

}
