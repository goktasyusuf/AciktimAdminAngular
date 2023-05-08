import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category/Category';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiURL:string = "https://localhost:44388/api/Category"

  constructor(private httpClient:HttpClient) { }

  getAllCategories():Observable<ListResponseModel<Category>> {
    return this.httpClient.get<ListResponseModel<Category>>(this.apiURL +"/getall");
  }

  getCategoryById(categoryId:string):Observable<SingleResponseModel<Category>> {
    return this.httpClient.get<SingleResponseModel<Category>>(this.apiURL +"/GetById?id=" + categoryId);
  }
}
