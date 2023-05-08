import { Pipe, PipeTransform } from '@angular/core';
import { CustomerDetails } from '../models/customer/customerDetails';

@Pipe({
  name: 'customerPipe'
})
export class CustomerPipePipe implements PipeTransform {

  transform(value: CustomerDetails[], filter: string): CustomerDetails[] {
    return filter ? value.filter(x => x.firstName.toLowerCase().indexOf(filter.toLowerCase()) !== -1) : value;
  }
}
