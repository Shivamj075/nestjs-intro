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
        const product = this.findProduct(productId)[0];
        return {...product };
    }

    updateProduct(productId:string, title:string, desc:string, price:number){
        const [product, index] = this.findProduct(productId);
        const updatedProduct = {...product};
        if(title){
            updatedProduct.title = title;
        }
        if(desc){
            updatedProduct.description = desc;
        }
        if(price){
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;
    }

    deleteProduct(prodId: string){
        const index = this.findProduct(prodId)[1];
        this.products.splice(index,1);
    }
    private findProduct(id:String): [Product, number]{
        const productIndex = this.products.findIndex(prod => prod.id==id);
        const product = this.products[productIndex];
        if(!product){
            throw new NotFoundException("could not found product..");
        }
        return [product, productIndex];
    }
}