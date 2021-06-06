import {Injectable, NotFoundException} from '@nestjs/common';

import {Product} from './product.model';

@Injectable()
export class ProductsService{
    products: Product[] = [];

    insertProduct(title: string, desc: string, price: number){
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId,title, desc, price);
        this.products.push(newProduct);
        return prodId;
    }

    getProducts() {
        return [...this.products]; //pulling out all elements and add them as new elements and products themselver are obj & we don't copy those
    }

    getSingleProducts(productId: string){
        const product = this.products.find((prod) => prod.id==productId);
        if(!product){
            throw new NotFoundException("could not found product..");
        }
        return {...product };
    }
}