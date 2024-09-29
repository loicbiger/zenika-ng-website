import { TestBed } from '@angular/core/testing';

import { BasketService } from './basket.service';
import {Product} from "../product/product.types";

describe('BasketService', () => {
  let service: BasketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update the items when a product is added', () => {
    const product: Product = { id: 'test', title: 'Test Product', description: 'Test Description', price: 10, stock: 1, photo: 'test.jpg' };
    service.addItem(product);
    expect(service.items.length).toBe(1);
    expect(service.items[0]).toEqual(product);
  });

  it('should update the total when a product is added', () => {
    const product: Product = { id: 'test', title: 'Test Product', description: 'Test Description', price: 10, stock: 1, photo: 'test.jpg' };
    service.addItem(product);
    expect(service.total).toBe(10);
  });
});
