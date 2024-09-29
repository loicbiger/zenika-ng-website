import { SortProductsPipePipe } from './sort-products-pipe.pipe';
import { Product } from '../product/product.types';

describe('SortProductsPipePipe', () => {
  let pipe: SortProductsPipePipe;
  let products: Product[];

  beforeEach(() => {
    pipe = new SortProductsPipePipe();
    products = [
      { id: '1', title: 'Product B', description: '', price: 20, stock: 10, photo: '' },
      { id: '2', title: 'Product A', description: '', price: 10, stock: 5, photo: '' }
    ];
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should not sort products when key is undefined', () => {
    const result = pipe.transform(products, undefined);
    expect(result).toEqual(products);
  });

  it('should sort products by price', () => {
    const result = pipe.transform(products, 'price');
    expect(result[0].price).toBe(10);
    expect(result[1].price).toBe(20);
  });


});
