import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { MenuComponent } from './menu/menu.component';
import { By } from '@angular/platform-browser';
import { BasketService, BasketStubService } from './basket/basket.service';
import { CatalogService, CatalogStubService } from './catalog/catalog.service';
import { APP_TITLE } from './app.token';
import {SelectProductKeyComponent} from "./select-product-key/select-product-key.component";
import {DEFAULT_CURRENCY_CODE, LOCALE_ID} from "@angular/core";
import localeFr from '@angular/common/locales/fr';
import {registerLocaleData} from "@angular/common";
import {CatalogComponent} from "./catalog.component";

// Register French locale data
registerLocaleData(localeFr, 'fr');

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let basketService: BasketStubService;
  let catalogService: CatalogStubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogComponent, ProductComponent, MenuComponent, SelectProductKeyComponent],
      providers: [
        { provide: BasketService, useClass: BasketStubService },
        { provide: CatalogService, useClass: CatalogStubService },
        { provide: APP_TITLE, useValue: 'Bienvenue sur Zenika Ecommerce' },
        { provide: LOCALE_ID, useValue: 'fr' },
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' }
      ]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    basketService = TestBed.inject(BasketService) as BasketStubService;
    catalogService = TestBed.inject(CatalogService) as CatalogStubService;
    catalogService.products = [
      { id: 'test1', title: 'Test Product 1', description: 'Description 1', price: 10, stock: 1, photo: 'test1.jpg' },
      { id: 'test2', title: 'Test Product 2', description: 'Description 2', price: 20, stock: 2, photo: 'test2.jpg' }
    ];
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  xit('should display the products', () => {
    const productElements = fixture.debugElement.queryAll(By.css('app-product'));
    expect(productElements.length).toBe(catalogService.products.length);
  });

  xit('should not display products whose stock is empty', () => {
    catalogService.products[0].stock = 0;// Ensure products array is updated
    fixture.detectChanges();
    const productElements = fixture.debugElement.queryAll(By.css('app-product'));
    expect(productElements.length).toBe(catalogService.products.length - 1);
  });

  it('should display a message when stock is completely empty', () => {
    catalogService.products.forEach(product => product.stock = 0);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Désolé, notre stock est vide !');
  });

  xit('should add product to basket when onAddToBasket is called', () => {
    const product = catalogService.products[0];
    component.onAddToBasket(product);
    expect(basketService.items.length).toBe(1);
    expect(basketService.items[0]).toEqual(product);
  });

  xit('should call CatalogService.decreaseStock and BasketService.addItem when a product is added to the basket', () => {
    const product = catalogService.products[0];
    spyOn(catalogService, 'decreaseStock').and.callThrough();
    spyOn(basketService, 'addItem').and.callThrough();
    component.onAddToBasket(product);
    expect(catalogService.decreaseStock).toHaveBeenCalledWith(product.id);
    expect(basketService.addItem).toHaveBeenCalledWith(jasmine.objectContaining({ id: product.id }));
  });

  it('should display the app title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Bienvenue sur Zenika Ecommerce');
  });

  xit('should display the products sorted by price', () => {
    component.productKey = 'price';
    fixture.detectChanges();
    const productElements = fixture.debugElement.queryAll(By.css('app-product'));
    const productPrices = productElements.map(el => el.componentInstance.product.price);
    expect(productPrices).toEqual([10, 20]);
  });

  xit('should display the products sorted by stock', () => {
    component.productKey = 'stock';
    fixture.detectChanges();
    const productElements = fixture.debugElement.queryAll(By.css('app-product'));
    const productStocks = productElements.map(el => el.componentInstance.product.stock);
    expect(productStocks).toEqual([1, 2]);
  });

  it('should display the basket total with currency', () => {
    const compiled = fixture.nativeElement;
    const basketTotal = compiled.querySelector('p').textContent;
    expect(basketTotal).toContain('€');
  });
});
