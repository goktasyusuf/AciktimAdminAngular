import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { Restaurant } from 'src/app/models/restaurant/Restaurant';
import { RestaurantOrderNumber } from 'src/app/models/restaurant/restaurantOrderNumber';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  apiURL: string = "https://localhost:44388/api/Restaurant"

  constructor(private httpClient: HttpClient) { }

  getActiveRestaurants(): Observable<ListResponseModel<Restaurant>> {
    return this.httpClient.get<ListResponseModel<Restaurant>>(this.apiURL + "/GetActiveRestaurantsWithImage");
  }

  getRestaurantDetailsByRestaurantId(restaurantId: string): Observable<SingleResponseModel<Restaurant>> {
    return this.httpClient.get<SingleResponseModel<Restaurant>>(this.apiURL + "/GetRestaurantDetailByRestaurantId?restaurantId=" + restaurantId)
  }

  updateRestaurant(restaurant:Restaurant):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiURL +"/update" , restaurant);
  }

  deleteRestaurant(restaurantId:string):Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>(this.apiURL +"/delete?id=" + restaurantId);
  }

  getPassiveRestaurants(): Observable<ListResponseModel<Restaurant>> {
    return this.httpClient.get<ListResponseModel<Restaurant>>(this.apiURL + "/GetPassiveRestaurantsWithImage");
  }
  
  getRestaurantsOrderNumber():Observable<ListResponseModel<RestaurantOrderNumber>> {
    return this.httpClient.get<ListResponseModel<RestaurantOrderNumber>>(this.apiURL + "/GetRestaurantsOrderNumber");
  }
}
