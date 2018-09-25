import { Component, OnInit, Input } from '@angular/core';
import { ProductWrapper } from '../../data-models/product-wrapper-model';

@Component({
  selector: 'app-products-loader',
  templateUrl: './products-loader.component.html',
  styleUrls: ['./products-loader.component.css']
})
export class ProductsLoaderComponent implements OnInit {
  @Input() products: ProductWrapper[];
  loadedProducts: ProductWrapper[]  = [];
  steps = [];

  activeButtonIndex = 1
  startIndex = 0;
  lastIndex = 15;
  constructor() { }

  ngOnInit() {

    if(this.products.length > 15){
      let length = this.products.length / 15;
      const remainder = this.products.length % 15;
      if(remainder > 0){
        length += 1;
      }

      for(let i = 1; i <= length; i++){
        this.steps.push(i);
      }

    }else{
      this.loadedProducts = this.products;
    }

    this.loadProducts();
    
  }

  loadMore(index){
    this.activeButtonIndex = index;
    index -= 1;

    this.startIndex = 15 * index;
    this.lastIndex =  this.startIndex + 15;
    this.loadProducts();
  }

  loadProducts(){
    this.loadedProducts = this.products.slice(this.startIndex,this.lastIndex);
  }
}
