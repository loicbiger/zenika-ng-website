import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CatalogComponent} from "./catalog/catalog.component";
import {BasketComponent} from "./basket/basket.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {BasketEmptyComponent} from "./basket-empty-component/basket-empty-component.component";
import {BasketGuard} from "./basket/basket.guard";

const routes: Routes = [
  {path: 'catalog', component: CatalogComponent},
  {path: 'basket', component: BasketComponent, canActivate: [BasketGuard]},
  {path: 'basket-empty', component: BasketEmptyComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: '', redirectTo: 'catalog', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
