import { Product } from '../data-models/product.model';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { OrderProduct } from '../data-models/bascket-product.model';

@Injectable()
export class ShoppingBascketService {
    bascketProducts: OrderProduct[] = [];
    // bascketProductsEventSource: BehaviorSubject<LineProduct> = new BehaviorSubject<LineProduct>([]);
    // bascketProductsEvent$ = this.bascketProductsEventSource.asObservable();

    getBuscketProducts(): OrderProduct[] {
        return this.bascketProducts;
    }

    addProduct(prod: Product): void {
        const productPosition = this.getProductPosition(prod.id);
        
        if(productPosition !== -1){
           this.bascketProducts[productPosition].quantity += 1;
        }else{
            if(prod){
                this.bascketProducts.push(new OrderProduct({'productId': prod.id,'quantity': 1}));
            }
        }
        
        //this.bascketProductsEventSource.next(this.bascketProducts);
        console.log('cart product',this.bascketProducts);
    }

    reduceQuantity(id: number): void {
        const productPosition = this.getProductPosition(id);
        if(productPosition !== -1){
            this.bascketProducts[productPosition].quantity -= 1;
         }
    }

    getProductPosition(id: number): number {
        let productPosition = -1;
        this.bascketProducts.find((product: OrderProduct, index)=>{

            if(product.productId === id){
                productPosition = index;
                return true;
            }
        });

        return productPosition;
    }
}