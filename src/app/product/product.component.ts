import { Product } from '../data-models/product.model';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingBascketService } from '../shopping-basket/shopping-basket-service';
import { ProductWrapper } from '../data-models/product-wrapper-model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() productWrapper: ProductWrapper;
  product: Product;
  productImage: string;
 
  constructor(public bascket: ShoppingBascketService) { }

  ngOnInit() {
    if(this.productWrapper){
      this.product = this.productWrapper.product;
      this.productImage = this.productWrapper.productImage;
    }

    console.log('this.product ',this.product )
    if (!this.product) {
      this.product = {
        id: 12,
        productName: 'Black forest',
        productDesc: 'abc def j',
        price: 200,
        category: 'Cakes',
        quantity: 236,
        productImage: [],
        imageAdditonalInfo: ''
      };
    }

    // this.product.category
    // this.product.price
    // this.product.productDesc
    // this.product.quantity
  }

  addToCart(){
    this.bascket.addProduct(this.product);
  }

}
