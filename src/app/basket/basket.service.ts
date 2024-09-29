import { Injectable } from '@angular/core';
import {BasketItem} from "./basket.types";
import {HttpClient} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private http: HttpClient) { }

  private _items?: BasketItem[] = [];
  private itemsFetched = false;

  get items(): BasketItem[] | undefined{
    return this._items;
  }

  get total(): number | undefined {
    return this._items?.reduce((total, item) => total + item.price, 0);
  }

  addItem(product: BasketItem): Observable<BasketItem> {
     return this.http.post<BasketItem>('http://localhost:8080/api/basket', { productId: product.id })
          .pipe(
              tap(product => this._items?.push(product))
          );
    }

    fetchBasketItems(refresh = false): Observable<BasketItem[]> {
        if (!refresh && this._items) {
            return of(this._items);
        }
        return this.http.get<BasketItem[]>('http://localhost:8080/api/basket')
            .pipe(
                tap(items => {
                    this._items = items;
                })
            );
    }
}

@Injectable()
 export class BasketStubService implements Partial<BasketService>{
  items: BasketItem[] = [];
  total: number = 0;
    addItem(item: BasketItem): Observable<BasketItem> {
        this.items.push(item);
        return new Observable<BasketItem>((observer) => {
            observer.next(item);
            observer.complete();
        });
    }
 }
