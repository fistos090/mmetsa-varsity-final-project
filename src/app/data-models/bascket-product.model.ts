export class OrderProduct {
    id: number;
    // @Column(nullable=false, length=10)
    productId: number;
    // @Column(nullable=false, length=5)
    quantity: number;
    // @Column(length = 10, nullable = false)
    orderID: number;

    constructor(args:any){
        this.id = args.id;
        this.productId = args.productId;
        this.quantity = args.quantity;
        this.orderID = args.orderID;
    }
}