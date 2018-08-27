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
  constructor(public bascket: ShoppingBascketService, private router: Router) { }

  ngOnInit() {
    this.basketProducts = this.bascket.getBascketProducts();
  }

  shopping(){
    this.router.navigate(['home']);
  }
}
