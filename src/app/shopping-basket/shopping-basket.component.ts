import { SpinnerService } from './../service-spinner/spinner-service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductWrapper } from '../data-models/product-wrapper-model';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Product } from '../data-models/product.model';
import { ShoppingBascketService } from './shopping-basket-service';
import { OrderProduct } from '../data-models/bascket-product.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user-account/register/user-details/user-service';
import { OrderAddress } from 'src/app/data-models/order-address.model';

@Component({
  selector: 'app-shopping-basket',
  templateUrl: './shopping-basket.component.html',
  styleUrls: ['./shopping-basket.component.css']
})
export class ShoppingBusketComponent implements OnInit, AfterViewInit {
 
  ngAfterViewInit(): void {
    window.scroll(0,0);
  }

  basketProducts: OrderProduct[] = [];
  actualProducts: ProductWrapper[] = [];

  totalCost = 0;
  totalNumOfProducts
  activeNavID = 0;
  showErrors = false;
  isPaymentSuccessful = false;
  addressForm: FormGroup;
  addressData: OrderAddress;
  userNames: string;

  formErrors = {
    houseNumber: {
      required: 'Please provide unit or house number',
      pattern: 'Please provide valid house or unit number'
    },
    streetName: {
      required: 'Please provide street name',
      pattern: 'Please provide valid street name'
    },
    surburb: {
      required: 'Please provide surburb name',
      pattern: 'Please provide valid surburb name'
    },
    city: {
      required: 'Please provide city',
      pattern: 'Please provide valid city name'
    },
    postalCode: {
      required: 'Please provide postal code',
      pattern: 'Invalid postal code'
    },
    province: {
      required: 'Please select province'
    }
  };

  formControlErrorMessage = {
    houseNumber: '',
    streetName: '',
    surburb: '',
    city: '',
    postalCode: '',
    province: '',
    showErrors: false
  };

  constructor(public bascket: ShoppingBascketService, private router: Router, private httpClient: HttpClient,
              private formBuilder: FormBuilder, private logonUserService: UserService, private spinner: SpinnerService) { }

  ngOnInit() {
    this.basketProducts = this.bascket.getBascketProducts();
    this.actualProducts = this.bascket.getActualProducts();

    this.calculateTotalCost();

    this.addressForm = this.formBuilder.group({
      houseNumber: ['',[Validators.required, Validators.pattern(/^(?![ ]+$)[a-zA-Z0-9 ]+$/)]],
      streetName: ['',[Validators.required, Validators.pattern(/^(?![ ]+$)[a-zA-Z0-9 ]+$/)]],
      surburb: ['',[Validators.required, Validators.pattern(/^(?![ ]+$)[a-zA-Z0-9 ]+$/)]],
      city: ['',[Validators.required, Validators.pattern(/^(?![ ]+$)[a-zA-Z0-9 ]+$/)]],
      postalCode: ['',[Validators.required,Validators.pattern(/^(?![ ]+$)[0-9 ]+$/)]],
      province: ['',[Validators.required]]
    });

    this.addressData = this.logonUserService.getAddress();
    const user = this.logonUserService.getLogonUser().userIn;

    if (this.addressData) this.addressForm.patchValue(this.addressData);

    this.addressForm.valueChanges.subscribe((val) => { this.onSubmit(); this.logonUserService.setAddress(val); });

    
    if (user) {
      this.userNames = (user.gender.toLowerCase() == 'female' ? 'Ms. ' : 'Mr. ') + user.firstname.charAt(0).toUpperCase() +' '+ user.lastname;
    }
    

  }

  shopping(){
    this.router.navigate(['home']);
  }

  onSubmit(): void {
    const form = this.addressForm;
    const formControls = this.addressForm.controls;

    for (const control in formControls) {
      if (form.controls[control].invalid) {
        for (const errorKey in form.controls[control].errors) {
            this.formControlErrorMessage[control] = this.formErrors[control][errorKey];
        }
      }
    }
  }

  remove(prodID: number){
    let index = this.actualProducts.findIndex( prodWrapper => prodWrapper.product.id == prodID)

    if(index !== -1){
      this.actualProducts.splice(index,1);
      this.basketProducts.splice(index,1);
    }
    this.calculateTotalCost();
  }

  increaseQuantity(orderProduct: OrderProduct){
    orderProduct.quantity += 1;
    this.calculateTotalCost();
  }

  reduceQuantity(orderProduct: OrderProduct){
    if (orderProduct.quantity > 1) {
      orderProduct.quantity -= 1;
    }
    this.calculateTotalCost();
  }

  calculateTotalCost(){
    this.totalCost = 0;
    this.totalNumOfProducts = 0;
    if (this.basketProducts) {
      this.basketProducts.forEach( (orderProd: OrderProduct, index) => {
        this.totalCost += (orderProd.quantity * this.actualProducts[index].product.price);
        this.totalNumOfProducts += orderProd.quantity;
      })
    }
  }

  checkout(): void {
    this.navigate(1);
  }

  loadPayment(): void {
    this.onSubmit();
    this.showErrors = true;
    if (this.addressForm.valid) {
      this.activeNavID = 2;
      this.addressData = this.addressForm.value;
    }
  }

  processPayment(){
    if ( this.isPaymentSuccessful ) {

    }
  }

  placePayment(){

    if ( this.isPaymentSuccessful ) {

      let orderItems = [];
      this.basketProducts.forEach( basketProd => {
        orderItems.push({
          'QUANTITY': basketProd.quantity,
          'ID': basketProd.productId
        })
      })
  
      const requestPayload = {
        'sessionID': this.logonUserService.getLogonUser().sessionID,
        'orderItems': orderItems,
        'addressInfo': this.addressData,
        'user': this.logonUserService.getLogonUser().userIn
      }

      this.spinner.showSpinner();
        this.httpClient.post('/BAKERY/checkout', requestPayload).subscribe(
          response => {
            this.spinner.hideSpinner();

          },
          error => {
            this.spinner.hideSpinner();

          }
          
        )
    }
  }


  navigate(id: number): void {
    this.activeNavID = id;
    window.scroll(0,0);
  }
}
