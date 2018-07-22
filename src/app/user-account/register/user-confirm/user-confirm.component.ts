import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Customer } from '../../../data-models/customer.model';
import { HttpClient } from '../../../../../node_modules/@angular/common/http';
import { UserService } from '../user-details/user-service';
import { Router } from '../../../../../node_modules/@angular/router';
import { RegisterStepperService } from '../register-stepper.service';

@Component({
  selector: 'app-user-confirm',
  templateUrl: './user-confirm.component.html',
  styleUrls: ['./user-confirm.component.css']
})
export class UserConfirmComponent implements OnInit, AfterViewInit {


  @Input() data: Customer;
  @Output() childEvent = new EventEmitter<{tabId: number, email: string}>()

  constructor(private httpClient: HttpClient, private logonUserService: UserService,
              private router: Router, private stepper: RegisterStepperService) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    window.scroll(0,0);
  }

  register(){
    this.httpClient.post('/TAKEALOT/customer/register', this.data).subscribe(
      (response) => {
      console.log(response);
      if (response) {
        alert(response['message']);
        if (response['status'] == 'CREATED') {
    
          this.logonUserService.setLogonUser(response["auto_logon"]);

        } else 
        if (response['status'] == 'CONFLICT') {

          this.childEvent.emit({'tabId': 1, 'email': this.data.email});
        }

      }

    }, 
    (error) => {
      console.log(error)
    });
  }

  back() {
    this.stepper.stepperEvent.next({'stepNumber': 1, 'data': this.data});
  }

}
