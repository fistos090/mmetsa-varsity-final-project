import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SpinnerService } from '../service-spinner/spinner-service';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { ProductWrapper } from '../data-models/product-wrapper-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  products: ProductWrapper[];
  showContent: boolean;

  constructor(public spinner: SpinnerService, private httpClient: HttpClient) { }

  ngOnInit(): void {

    this.spinner.showSpinner();
    // Fire request to fetch category producs
    this.httpClient.get<ProductWrapper[]>('/BAKERY/getHomeProducts').subscribe(
      (response) => {

        this.products = response['homeProducts'];
        this.showContent = true;
        this.spinner.hideSpinner();
      },
      (error) => {
        console.log('fetching products error ===>', error);
        this.showContent = true;
        this.spinner.hideSpinner();
      }
    );
  }

  ngAfterViewInit(): void {
    window.scroll(0,0);
  }

}
