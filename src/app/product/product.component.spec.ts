import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import {By} from "@angular/platform-browser";

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    component.product = {id: "1", title: 'TITLE', description: 'DESC', price: 10, stock: 1, photo: 'PHOTO'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the product photo as image url', () => {
    const img = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(img.src).toContain(component.product.photo);
  });

  it('should display the product description', () => {
    const description = fixture.debugElement.query(By.css('.card-header small')).nativeElement;
    expect(description.textContent).toContain(component.product.description);
  });

  it('should display the product title', () => {
    const title = fixture.debugElement.query(By.css('.card-title a')).nativeElement;
    expect(title.textContent).toContain(component.product.title);
  });

  it('should display the product price', () => {
    const price = fixture.debugElement.query(By.css('.card-text')).nativeElement;
    expect(price.textContent).toContain(`${component.product.price}`);
  });

  it('should emit addToBasket event with the given product when the button is clicked', () => {
    spyOn(component.addToBasket, 'emit');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(component.addToBasket.emit).toHaveBeenCalledWith(component.product);
  });

  it('should not add the "text-bg-warning" class when stock is greater than 1', () => {
    component.product.stock = 2;
    fixture.detectChanges();
    const card = fixture.debugElement.query(By.css('.card')).nativeElement;
    expect(card.classList).not.toContain('text-bg-warning');
  });

  it('should add the "text-bg-warning" class when stock is equal to 1', () => {
    component.product.stock = 1;
    fixture.detectChanges();
    const card = fixture.debugElement.query(By.css('.card')).nativeElement;
    expect(card.classList).toContain('text-bg-warning');
  });
});
