import { Pipe, PipeTransform } from '@angular/core';
import {Product} from "../product/product.types";

@Pipe({
  name: 'sortProductsPipe'
})
export class SortProductsPipePipe implements PipeTransform {

  transform(products: Product[], sortBy: 'price' | 'stock' = 'price'): Product[] {
    return [...products].sort((a, b) => a[sortBy] - b[sortBy]);
  }

}
