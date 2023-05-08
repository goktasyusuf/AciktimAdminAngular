import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerDetails } from 'src/app/models/customer/customerDetails';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit{
  customerId:string;
  customer:CustomerDetails;
  updateForm:FormGroup;
  constructor(private route: ActivatedRoute,private customerService:CustomerService,
    private toastrService:ToastrService,private formBuilder:FormBuilder,
    private router:Router){}
  ngOnInit(): void {
    this.getCustomerId();
    this.createUpdateForm();
    this.getCustomerDetailsByCustomerId(this.customerId);

  }
  getCustomerId() 
  {
    this.customerId = this.route.snapshot.paramMap.get('id');
  }
  getCustomerDetailsByCustomerId(customerId:string) {
    this.customerService.getCustomerDetailsByCustomerId(customerId).subscribe(response=>{
      response.success ? this.customer = response.data : null
      this.updateForm.patchValue(response.data)
      console.log(this.customer);
       
    })
  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      mailAddress:["",Validators.required],
      id:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      phoneNumber:["",Validators.required],
      registerDate:["",Validators.required],
      nationalityId:["",Validators.required],
      birthDay:["",Validators.required]
    })
  }

  updateUser() {
    let model = Object.assign({},this.updateForm.value)
    this.customerService.updateCustomer(model).subscribe(response=>{
      response.success ? this.toastrService.success("Kullanıcı Başarıyla Güncellendi!","BAŞARILI")  : null
      setTimeout(()=>{
        this.router.navigate(["/customer/list"])
      },1000)
    })
  }

}
