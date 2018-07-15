export class Product {
    id: number;
    productName: string;
    // @Column(nullable=false, length=45)
    productDesc: string;
    // @Column(nullable=false, length=10)
    price: number;
    // @Column(nullable=false, length=25)
    category: string;
    // @Column(nullable=false, length=10)
    quantity: number;
    // @Lob
    productImage;
    // @Column(nullable=false, length=25)
    imageAdditonalInfo: string;

    constructor(args: any){
        this.id = args.id;
        this.productName = args.productName;
        this.productDesc = args.productDesc;
        this.price = args.price;
        this.category = args.category;
        this.quantity = args.quantity;
        this.productImage = args.productImage;
        this.imageAdditonalInfo = args.imageAdditonalInfo;
    }
}