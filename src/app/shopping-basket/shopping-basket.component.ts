import { Component, OnInit } from '@angular/core';
import { Product } from '../data-models/product.model';
import { ShoppingBascketService } from './shopping-basket-service';
import { OrderProduct } from '../data-models/bascket-product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-basket',
  templateUrl: './shopping-basket.component.html',
  styleUrls: ['./shopping-basket.component.css']
})
export class ShoppingBusketComponent implements OnInit {

  basketProducts: OrderProduct[] = [];
  actualProducts: Product[] = [];

  totalCost = 0;

  constructor(public bascket: ShoppingBascketService, private router: Router) { }

  ngOnInit() {
    this.basketProducts = this.bascket.getBascketProducts();
    this.actualProducts = this.bascket.getActualProducts();

    this.calculateTotalCost();
  }

  shopping(){
    this.router.navigate(['home']);
  }

  remove(prodID: number){
    let index = this.actualProducts.findIndex( prod => prod.id == prodID)

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
    if (this.basketProducts) {
      this.basketProducts.forEach( (orderProd: OrderProduct, index) => {
        this.totalCost += (orderProd.quantity * this.actualProducts[index].price);
      })
    }
  }
}
