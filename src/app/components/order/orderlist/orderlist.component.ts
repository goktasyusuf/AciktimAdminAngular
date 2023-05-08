  import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order/order';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  order:Order;
  filter:string;
  totalPrice:number=0;
  constructor(private toastrService:ToastrService,private orderService:OrderService){}
  ngOnInit(): void {
  }

  getOrderDetailsByOrderId(orderId:string) {
    this.totalPrice = 0;
    this.orderService.getOrderDetailsByOrderId(orderId).subscribe(response=>{
      response.success ? this.order = response.data : null;
      console.log(this.order); 
      for (let i = 0; i < this.order.menus.length; i++) {
        this.totalPrice += this.order.menus[i].orderPrice;
      }
    })
  }

}
