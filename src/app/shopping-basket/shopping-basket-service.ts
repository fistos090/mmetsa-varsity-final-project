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

        let productPosition = -1;
        const tempProduct = this.bascketProducts.find((product: OrderProduct, index)=>{

            if(product.productId === prod.id){
                productPosition = index;
                return true;
            }
        });

        if(productPosition !== -1 && tempProduct){
            tempProduct.quantity += 1;
            this.bascketProducts[productPosition] = tempProduct;
        }else{
            if(prod){
                this.bascketProducts.push(new OrderProduct({'productId': prod.id,'quantity': 1}));
            }
        }
        
        //this.bascketProductsEventSource.next(this.bascketProducts);
    }
}