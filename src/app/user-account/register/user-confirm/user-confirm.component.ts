import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Customer } from '../../../data-models/customer.model';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user-details/user-service';
import { Router } from '@angular/router';
import { RegisterStepperService } from '../register-stepper.service';
import * as moment from 'moment';
import { SpinnerService } from '../../../service-spinner/spinner-service';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

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
    this.httpClient.post('/BAKERY/customer/register', this.data).subscribe(
      (response) => {
        this.spinner.hideSpinner();
        if (response) {
          // alert(response['message']);
          const status = String(response['status']);

          if (status === 'CREATED') {

            this.logonUserService.setLogonUser(response['auto_logon']);
            this.openPopup(response['message'], 'OK').subscribe(() => {
              this.router.navigate(['home']);
            });

          } else if (status === 'CONFLICT') {

            this.openPopup(response['message']+' Continue to log in', 'Yes').subscribe(() => {
              this.childEvent.emit({ 'tabId': 1, 'email': this.data.email });
            });
            
          }

        }

      },
      (error) => {
        console.log(error);
        this.spinner.hideSpinner();

      });
  }

  openPopup(message: string, action: string): Observable<any> {
    const snackBarRef = this.snackBar.open(message, action);

    snackBarRef.onAction().subscribe(() => {
      
    });

    snackBarRef.afterDismissed().subscribe(() => {

    });
    return snackBarRef.onAction();
    //  { duration: 2000 }
  }

  back() {
    this.data.dateOfBirth = this.dateDickerDate;
    this.stepper.stepperEvent.next({ 'stepNumber': 1, 'data': this.data });
  }

  maskData(value: string): string {
    let temp = '';
    let counter = 0;
    
    for (let x = 0; x < value.length; x++) {
      
      if (counter === 0) {
        temp += value.substr(x,1);
      } else {
        temp += '*';
        
      }
      
      
      if (counter === 2) counter = 0; else counter++;
    }

    return temp;
  }

}
