import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import CircleType from 'circletype';
import { ShoppingBascketService } from '../shopping-basket/shopping-basket-service';

// declare var jquery:any;
//declare var $ :any;

@Component({
  selector: 'app-topnav-menu',
  templateUrl: './topnav-menu.component.html',
  styleUrls: ['./topnav-menu.component.css']
})
export class TopnavMenuComponent implements OnInit {

  @ViewChild('logo') div: ElementRef;

  showCategoryDropdown = false;
  showLoginDropdown = false;
  activeItem: number;

  constructor(private router: Router, public bascket: ShoppingBascketService) {
    //this.bascket.bascketProducts
  }



  ngOnInit() {
    // $(window).click(function () {
    //   alert('ok');
    //   });

  }

  markActiveItem(activeItem: number) {
    this.activeItem = activeItem;
  }

  navigateToSpecificTab(id: number) {
    this.router.navigate(['user-account', id]);
  }

  loadCategory(category){
    this.router.navigate(['products-category', category]);
  }
}
