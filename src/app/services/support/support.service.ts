import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Mail } from 'src/app/models/mail/Mail';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  apiURL:string = "https://localhost:44388/api/Support"

  constructor(private httpClient:HttpClient) { }

  getMails():Observable<ListResponseModel<Mail>> {
    return this.httpClient.get<ListResponseModel<Mail>>(this.apiURL +"/GetSupportDetails");
  }

  getMailByMailId(id:string):Observable<SingleResponseModel<Mail>>{
    return this.httpClient.get<SingleResponseModel<Mail>>(this.apiURL + "/GetSupportDetailsById?id=" + id)
  }
  deleteMail(id:string):Observable<ResponseModel> {
    return this.httpClient.get<ResponseModel>(this.apiURL + "/Delete?id=" + id);
  }

}
