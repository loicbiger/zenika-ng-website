import {Component, OnInit} from '@angular/core';
import {BasketService} from "./basket.service";
import {BasketItem} from "./basket.types";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent implements OnInit {
  items: BasketItem[] = [];
  total = 0;

  constructor(private basketService: BasketService) {
  }

  ngOnInit(): void {
    this.basketService.fetchBasketItems().subscribe(items => {
      this.items = items;
      this.total = this.basketService?.total || 0;
    });
  }
}
