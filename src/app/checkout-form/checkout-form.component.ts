import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.css'
})
export class CheckoutFormComponent {

}

export interface CheckoutDetails {
  name: string;
  address: string;
  creditCard: string;
}
