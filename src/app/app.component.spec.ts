import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {ProductComponent} from "./product/product.component";
import {MenuComponent} from "./menu/menu.component";
import {By} from "@angular/platform-browser";
import {Product} from "./product/product.types";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, ProductComponent, MenuComponent],
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display the products', () => {
    const productElements = fixture.debugElement.queryAll(By.css('app-product'));
    expect(productElements.length).toBe(component.products.length);
  });

  it('should update the total when "addToBasket" class method is called', () => {
    const product: Product = { id: 'test', title: 'Test Product', description: 'Test Description', price: 10, stock: 1, photo: 'test.jpg' };
    component.updateTotal(product);
    expect(component.total).toBe(10);
  });

  it('should update the total when a product emits the "addToBasket" event', () => {
    const product: Product = { id: 'test', title: 'Test Product', description: 'Test Description', price: 10, stock: 1, photo: 'test.jpg' };
    const productComponent = fixture.debugElement.query(By.directive(ProductComponent)).componentInstance as ProductComponent;
    productComponent.addToBasket.emit(product);
    expect(component.total).toBe(10);
  });
});
