import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { CustomerDetails } from 'src/app/models/customer/customerDetails';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { MaxOrderDto } from 'src/app/models/order/maxOrderDto';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiURL:string = "https://localhost:44388/api/Customer"

  constructor(private httpClient:HttpClient) { }

  getCustomerDetails():Observable<ListResponseModel<CustomerDetails>>{
      return this.httpClient.get<ListResponseModel<CustomerDetails>>(this.apiURL +"/getall");
  }

  deleteCustomer(customerId:string):Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>(this.apiURL +"/delete?id="+customerId);
  }

 getCustomerDetailsByCustomerId(customerId:string):Observable<SingleResponseModel<CustomerDetails>>{
  return this.httpClient.get<SingleResponseModel<CustomerDetails>>(this.apiURL + "/getdetailsbyid?id=" + customerId);
 }

 updateCustomer(customer:CustomerDetails):Observable<ResponseModel>{
  return this.httpClient.post<ResponseModel>(this.apiURL +"/update",customer);
 }

 getMax10Orders():Observable<ListResponseModel<MaxOrderDto>>{
  return this.httpClient.get<ListResponseModel<MaxOrderDto>>(this.apiURL + "/GetCustomerOrdersByOrderNumbers");
}
GetCustomersByTodayRegisterDate():Observable<SingleResponseModel<number>> {
  return this.httpClient.get<SingleResponseModel<number>>(this.apiURL +"/GetCustomersByTodayRegisterDate")
}
 
}
