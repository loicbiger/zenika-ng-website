import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BasketService } from './basket.service';

@Injectable({
  providedIn: 'root'
})
export class BasketGuard implements CanActivate {

  constructor(private basketService: BasketService, private router: Router) {}

  canActivate(): boolean {
    if (this.basketService.items && this.basketService.items.length > 0) {
      return true;
      console.log('Basket is not empty');
    } else {
      this.router.navigate(['/basket-empty']);
      return false;
      console.log('Basket is empty');
    }
  }
}
