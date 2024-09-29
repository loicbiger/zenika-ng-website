import {Component, Inject} from '@angular/core';
import {SelectProductKey} from "../select-product-key/select-product-key.types";
import {CatalogService} from "./catalog.service";
import {BasketService} from "../basket/basket.service";
import {APP_TITLE} from "../app.token";
import {Product} from "../product/product.types";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {
  productKey: SelectProductKey = undefined;

  constructor(
      public catalogService: CatalogService,
      public basketService: BasketService,
      @Inject(APP_TITLE) public appTitle: string
  ) {}

  ngOnInit() {
    this.catalogService.fetchProducts(true).subscribe();
    this.basketService.fetchBasketItems(true).subscribe();
  }

  onAddToBasket(product: Product): void {
    if (product.stock > 0) {
      this.basketService.addItem({ ...product }).subscribe(() => {
        this.catalogService.decreaseStock(product.id);
      });
    }
  }

  hasProductsInStock(): boolean {
    return <boolean>this.catalogService.hasProductsInStock;
  }
}
