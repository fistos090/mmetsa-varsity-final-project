import { Product } from '../data-models/product.model';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { OrderProduct } from '../data-models/bascket-product.model';

@Injectable()
export class ShoppingBascketService {
    bascketProducts: Product[] = [];
    orderProducts: OrderProduct[] = [];
    // bascketProductsEventSource: BehaviorSubject<LineProduct> = new BehaviorSubject<LineProduct>([]);
    // bascketProductsEvent$ = this.bascketProductsEventSource.asObservable();

    getBascketProducts(): OrderProduct[] {
        return this.orderProducts;
    }

    addProduct(prod: Product): void {
        const productPosition = this.getProductPosition(prod.id);
        
        if(productPosition !== -1){
           this.orderProducts[productPosition].quantity += 1;
        }else{
            if(prod){
                this.orderProducts.push(new OrderProduct({'productId': prod.id,'quantity': 1}));
                this.bascketProducts.push(prod);
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