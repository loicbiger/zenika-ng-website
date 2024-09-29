import { Component } from '@angular/core';
import {BasketService} from "../basket/basket.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(public basketService: BasketService) {}
}
