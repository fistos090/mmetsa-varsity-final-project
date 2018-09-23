import { ProductWrapper } from './../data-models/product-wrapper-model';
import { Product } from '../data-models/product.model';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { OrderProduct } from '../data-models/bascket-product.model';

@Injectable()
export class ShoppingBascketService {
    actualProducts: ProductWrapper[] = [];
    orderProducts: OrderProduct[] = [];
    // bascketProductsEventSource: BehaviorSubject<LineProduct> = new BehaviorSubject<LineProduct>([]);
    // bascketProductsEvent$ = this.bascketProductsEventSource.asObservable();

    getBascketProducts(): OrderProduct[] {
        return this.orderProducts;
    }

    getActualProducts(): ProductWrapper[] {
        return this.actualProducts;
    }

    addProduct(prodWrapper: ProductWrapper): void {
        const productPosition = this.getProductPosition(prodWrapper.product.id);
        
        if(productPosition !== -1){
           this.orderProducts[productPosition].quantity += 1;
        }else{
            if(prodWrapper){
                this.orderProducts.push(new OrderProduct({'productId': prodWrapper.product.id,'quantity': 1}));
                this.actualProducts.push(prodWrapper);
            }
        }
        
        //this.bascketProductsEventSource.next(this.bascketProducts);
        console.log('cart product',this.orderProducts);
    }

    reduceQuantity(id: number): void {
        const productPosition = this.getProductPosition(id);
        if(productPosition !== -1){
           if (this.orderProducts[productPosition].quantity > 1) {
            this.orderProducts[productPosition].quantity -= 1;
           }
         }
    }

    getProductPosition(id: number): number {
        let productPosition = -1;
        this.orderProducts.find((product: OrderProduct, index)=>{

            if(product.productId === id){
                productPosition = index;
                return true;
            }
        });

        return productPosition;
    }

    
}