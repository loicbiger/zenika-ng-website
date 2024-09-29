import { Injectable } from '@angular/core';
import {Product} from "../product/product.types";
import {HttpClient} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CatalogService {
    private _products?: Product[] = [];
    constructor(private http: HttpClient) { }

    get products(): Product[] | undefined {
        return this._products;
    }

    get hasProductsInStock(): boolean | undefined {
        return this._products?.some(product => product.stock > 0);
    }

    decreaseStock(productId: string): boolean {
        const product = this._products?.find(p => p.id === productId);
        if (product && product.stock > 0) {
            product.stock--;
            return true;
        }
        return false;
    }

    fetchProducts(refresh = false): Observable<Product[]>  {
        if (!refresh && this._products) {
            return of(this._products);
        }
        return this.http.get<Product[]>('http://localhost:8080/api/products')
            .pipe(
                tap(products => {
                    this._products = products;
                }) );
    }
}

export class CatalogStubService implements Partial<CatalogService>{
    products: Product[] = [];
    hasProductsInStock: boolean = false;
    decreaseStock(productId: string): boolean {
        return false;
    }
}
