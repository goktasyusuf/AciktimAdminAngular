import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomerDetails } from 'src/app/models/customer/customerDetails';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: CustomerDetails[];
  filter:string;
  constructor(private customerService:CustomerService,private toastrService:ToastrService){}
  ngOnInit(): void 
  {
    this.getCustomerDetails();
  }

  getCustomerDetails() {
    this.customerService.getCustomerDetails().subscribe(response=>{
      response.success ? this.customers = response.data:null
    },error=>this.toastrService.error(error.error))
  }

  deleteCustomer(customerId:string) {
    if(confirm("Kullanıcıyı silmek istediğinize emin misiniz ? ")){
      this.customerService.deleteCustomer(customerId).subscribe(response=>{
        response.success ? this.toastrService.success("Kullanıcı Başarıyla Silindi") : null 
        this.getCustomerDetails();
      })
    }
  }
}
