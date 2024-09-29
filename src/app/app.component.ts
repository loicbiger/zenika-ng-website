import {Component, Inject, OnInit} from '@angular/core';
import {Product} from "./product/product.types";
import {BasketService} from "./basket/basket.service";
import {CatalogService} from "./catalog/catalog.service";
import {APP_TITLE} from "./app.token";
import {SelectProductKey} from "./select-product-key/select-product-key.types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
