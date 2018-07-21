import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductWrapper } from '../data-models/product-wrapper-model';
import { SpinnerService } from '../service-spinner/spinner-service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  categoryName: string;
  titleImage = '';
  categoryClassName

  products: ProductWrapper[] = [];
  showContent = false;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private spinner: SpinnerService) {

    //alert(this.titleImage)
    // '+this.titleImage+'
    this.route.params.subscribe(routeParams => {

      if (routeParams['categoryName']) {
        this.categoryName = routeParams['categoryName'];
        this.categoryClassName = this.categoryName;
        // this.titleImage = 'url(../../assets/sys_images/' + this.categoryName + '.jpg)';

        this.showContent = false;
        this.spinner.showSpinner();
        //Fire request to fetch category producs
        this.httpClient.get<ProductWrapper[]>('/TAKEALOT/category/' + this.categoryName).subscribe(
          (response) => {
            console.log('products ===>',response['products']);
            this.products = response['products'];
            this.showContent = true;
            this.spinner.hideSpinner();
          },
          (error) => {
            console.log('fetching products error ===>',error);
            this.showContent = true;
            this.spinner.hideSpinner();
          }
        );

        // if(this.products.length <= 0){
        //   for(let i = 0; i < 25; i++){
        //     this.products.push({
        //       product: {
        //         id: i+1,
        //         productName: 'Black forest',
        //         productDesc: 'abc def j',
        //         price: 200,
        //         category: 'Cakes',
        //         quantity: 236,
        //         productImage: [],
        //         imageAdditonalInfo: ''
        //       },
        //       productImage: ''
        //     });
        //   }
        // }
      }




      //this.products = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    })
  }

  ngOnInit() {
    window.scroll(0, 0);
  }

}
