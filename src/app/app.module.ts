import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {ProductComponent} from './product/product.component';
import {APP_TITLE} from "./app.token";
import {registerLocaleData} from "@angular/common";
import localeFr from '@angular/common/locales/fr';
import {SortProductsPipePipe} from './sort-products/sort-products-pipe.pipe';
import {SelectProductKeyComponent} from "./select-product-key/select-product-key.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CatalogComponent} from './catalog/catalog.component';
import {BasketComponent} from './basket/basket.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {BasketEmptyComponent} from './basket-empty-component/basket-empty-component.component';
import {FormsModule} from "@angular/forms";
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';

registerLocaleData(localeFr);

const appTitleProvider = {
    provide: APP_TITLE,
    useValue: 'Bienvenue sur Zenika Ecommerce'
};

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        ProductComponent,
        SortProductsPipePipe,
        SelectProductKeyComponent,
        CatalogComponent,
        BasketComponent,
        ProductDetailsComponent,
        BasketEmptyComponent,
        CheckoutFormComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [
        appTitleProvider,
        {provide: LOCALE_ID, useValue: 'fr'},
        {provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
