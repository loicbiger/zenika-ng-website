import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import {BasketService, BasketStubService} from "../basket/basket.service";
import {By} from "@angular/platform-browser";

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent],
      providers: [
        {
          provide: BasketService, userClass: BasketStubService
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should display the number of items', () => {
    const basketService = TestBed.inject(BasketService);
    basketService.addItem({ id: 'test', title: 'Test Product', price: 10});
    fixture.detectChanges();

    const itemCountElement = fixture.debugElement.query(By.css('.badge'));
    expect(itemCountElement.nativeElement.textContent).toContain('1');
  });
});
