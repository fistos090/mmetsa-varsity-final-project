import { SpinnerService } from './../service-spinner/spinner-service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductWrapper } from '../data-models/product-wrapper-model';
import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ShoppingBascketService } from './shopping-basket-service';
import { OrderProduct } from '../data-models/bascket-product.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user-account/register/user-details/user-service';
import { OrderAddress } from 'src/app/data-models/order-address.model';

declare let paypal: any;

@Component({
  selector: 'app-shopping-basket',
  templateUrl: './shopping-basket.component.html',
  styleUrls: ['./shopping-basket.component.css']
})
export class ShoppingBusketComponent implements OnInit, AfterViewInit, AfterViewChecked {

  ngAfterViewInit(): void {
    window.scroll(0, 0);
  }

  paypalClientID = 'AWzftjxjsAjvjxj9ea9k87-DUDkFSab6EA_2j6eaj0Ulip9DI1Nbe0QTZjyiJG0XSIMFAzgeC-_HCblH';

  addPayPalBtn = false;
  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: this.paypalClientID
    },
    commit: true,
    payment: (data, actions) => {
      console.log('payment data 1 ++++>', data);
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.totalCost, currency: 'USD' } }
          ]
        }
      })
    
    },

    onAuthorize: function (data, actions) {
      return actions.payment.execute().then(function () {
        // Show a confirmation message to the buyer
        window.alert('Thank you for your purchase!');

        const btnRef = document.querySelector('#place-order-btn');
        btnRef.setAttribute('hidden','false');
        btnRef.setAttribute('style', 'display: inline-block');    // .display

        document.querySelector('#paypal-button').setAttribute('hidden','true')

        const paymentStatusRef = document.querySelector('#payment-status');
        paymentStatusRef.innerHTML = 'Payment has been successfully processed.';

      },
      error => {
        console.log('payment error ++++>', error);

      });
    }
  }

  paymentMessage = '';
  basketProducts: OrderProduct[] = [];
  actualProducts: ProductWrapper[] = [];

  totalCost = '';
  totalNumOfProducts
  activeNavID = 0;
  showErrors = false;
  placeOrderStatus = false;
  isPlaceOrderSuccessful = false;
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
      houseNumber: ['', [Validators.required, Validators.pattern(/^(?![ ]+$)[a-zA-Z0-9 ]+$/)]],
      streetName: ['', [Validators.required, Validators.pattern(/^(?![ ]+$)[a-zA-Z0-9 ]+$/)]],
      surburb: ['', [Validators.required, Validators.pattern(/^(?![ ]+$)[a-zA-Z0-9 ]+$/)]],
      city: ['', [Validators.required, Validators.pattern(/^(?![ ]+$)[a-zA-Z0-9 ]+$/)]],
      postalCode: ['', [Validators.required, Validators.pattern(/^(?![ ]+$)[0-9 ]+$/)]],
      province: ['', [Validators.required]]
    });

    this.addressData = this.logonUserService.getAddress();
    const logonUser = this.logonUserService.getLogonUser();

    if (this.addressData) this.addressForm.patchValue(this.addressData);

    this.addressForm.valueChanges.subscribe((val) => { this.onSubmit(); this.logonUserService.setAddress(val); });


    if (logonUser) {
      const user = logonUser.userIn;
      this.userNames = (user.gender.toLowerCase() == 'female' ? 'Ms. ' : 'Mr. ') + user.firstname.charAt(0).toUpperCase() + ' ' + user.lastname;
    }


  }

  ngAfterViewChecked(): void {
    if (!this.logonUserService.isPaypalScriptLoad ) {
      this.loadPayPalScript();
    }
  }

  loadPayPalScript(): void {

    this.logonUserService.isPaypalScriptLoad = true;
    let promise = new Promise((resolve, reject) => {
      let scriptRef = document.createElement('script');

      if (scriptRef) {
        scriptRef.src = 'https://www.paypalobjects.com/api/checkout.js';
        scriptRef.onload = resolve;

        document.body.appendChild(scriptRef);
      }
    });

    // .then(() => {
    //   paypal.Button.render(this.paypalConfig, '#paypal-button');
    // })
  }

  shopping(): void {
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

  remove(prodID: number): void {
    let index = this.actualProducts.findIndex(prodWrapper => prodWrapper.product.id == prodID)

    if (index !== -1) {
      this.actualProducts.splice(index, 1);
      this.basketProducts.splice(index, 1);
    }
    this.calculateTotalCost();
  }

  increaseQuantity(orderProduct: OrderProduct): void {
    orderProduct.quantity += 1;
    this.calculateTotalCost();
  }

  reduceQuantity(orderProduct: OrderProduct): void {
    if (orderProduct.quantity > 1) {
      orderProduct.quantity -= 1;
    }
    this.calculateTotalCost();
  }

  calculateTotalCost(): void {
    let tempTotal = 0;
    this.totalCost = '';
    this.totalNumOfProducts = 0;
    if (this.basketProducts) {
      this.basketProducts.forEach((orderProd: OrderProduct, index) => {
        tempTotal += (orderProd.quantity * this.actualProducts[index].product.price);
        this.totalNumOfProducts += orderProd.quantity;
      })
    }

    // Two decimal place
    this.toTwoDecimalPlace(tempTotal);
  }

  toTwoDecimalPlace(value: number): void {

    let tokens = value.toString().split('.');

    if (tokens.length > 1) {
      tokens[1] = tokens[1].substr(0,2);
      this.totalCost = tokens[0]+'.'+tokens[1];
    } else {
      this.totalCost = value+'.00'
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

      if (!this.addPayPalBtn) {
        this.addPayPalBtn = true;
        paypal.Button.render(this.paypalConfig, '#paypal-button');
      }

    }
  }

  processPayment(): void {

  }

  placeOrder(): void {

      let orderItems = [];
      this.basketProducts.forEach(basketProd => {
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
          // alert();
          this.paymentMessage = response['message'];
          this.bascket.actualProducts = [];
          this.bascket.orderProducts = [];

          this.placeOrderStatus = response['status'] == 'CREATED';
          this.isPlaceOrderSuccessful = true;
        },
        error => {
          this.spinner.hideSpinner();

        }

      )

  }

  done() {
    this.router.navigate(['home']);
  }

  navigate(id: number): void {
    this.activeNavID = id;
    window.scroll(0, 0);
  }
}
