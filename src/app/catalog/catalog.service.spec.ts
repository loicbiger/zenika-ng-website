import { TestBed } from '@angular/core/testing';

import { CatalogService } from './catalog.service';

describe('CatalogService', () => {
  let service: CatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should decrease the product stock', () => {
    const productId = 'welsch';
    const initialStock = service.products.find(p => p.id === productId)?.stock;
    const result = service.decreaseStock(productId);
    const updatedStock = service.products.find(p => p.id === productId)?.stock;

    expect(result).toBeTrue();
    expect(updatedStock).toBe(initialStock! - 1);
  });

  it('should not decrease the product stock when stock is empty', () => {
    const productId = 'welsch';
    while (service.decreaseStock(productId)) {}

    const result = service.decreaseStock(productId);
    const updatedStock = service.products.find(p => p.id === productId)?.stock;

    expect(result).toBeFalse();
    expect(updatedStock).toBe(0);
  });
});
