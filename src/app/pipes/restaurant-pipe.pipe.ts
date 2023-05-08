import { Pipe, PipeTransform } from '@angular/core';
import { Restaurant } from '../models/restaurant/Restaurant';

@Pipe({
  name: 'restaurantPipe'
})
export class RestaurantPipePipe implements PipeTransform {

  transform(value: Restaurant[], filter:string): Restaurant[] {
    return filter ? value.filter(x=>x.restaurantName.toLowerCase().indexOf(filter.toLowerCase())!==-1) : value;
  }

}
