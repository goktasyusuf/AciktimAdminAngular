import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../models/order/order';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {
  transform(value:Order[], filter:string): Order[] 
  {
  return filter ? value.filter(x=>x.restaurantName.toLowerCase().indexOf(filter.toLowerCase())!== -1) : value 
  }
}
