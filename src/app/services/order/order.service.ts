import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { MaxOrderDto } from 'src/app/models/order/maxOrderDto';
import { Order } from 'src/app/models/order/order';
import { OrdersByDate } from 'src/app/models/order/ordersByDateDto';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiURL:string = "https://localhost:44388/api/Order"

  constructor(private httpClient:HttpClient) { }

  getActiveOrderDetailsByRestaurantId(restaurantId:string):Observable<ListResponseModel<Order>> {
    return this.httpClient.get<ListResponseModel<Order>>(this.apiURL +"/GetActiveOrdersByRestaurantId?restaurantId=" + restaurantId)
  }

  getPassiveOrderDetailsByRestaurantId(restaurantId:string):Observable<ListResponseModel<Order>> {
    return this.httpClient.get<ListResponseModel<Order>>(this.apiURL + "/GetPassiveOrdersByRestaurantId?restaurantId=" + restaurantId);
  }

  getOrderDetailsByOrderId(orderId:string):Observable<SingleResponseModel<Order>> {
    return this.httpClient.get<SingleResponseModel<Order>>(this.apiURL +"/getbyid?id=" + orderId);
  }
  
  getAllOrders() : Observable<ListResponseModel<Order>> {
    return this.httpClient.get<ListResponseModel<Order>>(this.apiURL + "/GetAllOrders");
  }
  
  getTodayOrders():Observable<SingleResponseModel<OrdersByDate>> {
    return this.httpClient.get<SingleResponseModel<OrdersByDate>>(this.apiURL +"/GetTodayOrders");
  }

  getYesterdayOrders():Observable<SingleResponseModel<OrdersByDate>> {
    return this.httpClient.get<SingleResponseModel<OrdersByDate>>(this.apiURL +"/GetYesterdayOrders");
  }

 
}
