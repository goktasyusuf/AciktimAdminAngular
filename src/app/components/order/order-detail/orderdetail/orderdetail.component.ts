import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order/order';
import { Restaurant } from 'src/app/models/restaurant/Restaurant';
import { OrderService } from 'src/app/services/order/order.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {
  activeOrders:Order[];
  passiveOrders:Order[];
  passiveText:string;
  activeText:string;
  restaurantId:any;
  restaurant:Restaurant;
  constructor(private toastrService:ToastrService , private orderService:OrderService,private route:ActivatedRoute,private restaurantService:RestaurantService){}
  ngOnInit(): void {
    this.getRestaurantId();
    this.getRestaurantDetailsByRestaurantId(this.restaurantId);
    this.getActiveOrdersByRestaurantId();
    this.getPassiveOrdersByRestaurantId();
  }

  getRestaurantId() {
    this.restaurantId = this.route.snapshot.paramMap.get('id');
  }

  getActiveOrdersByRestaurantId() {
    this.orderService.getActiveOrderDetailsByRestaurantId(this.restaurantId).subscribe(response=>{
      response.success ? this.activeOrders = response.data :  null;  
      console.log(this.activeOrders);
       
    })
  }

  getPassiveOrdersByRestaurantId() {
    this.orderService.getPassiveOrderDetailsByRestaurantId(this.restaurantId).subscribe(response=>{
      response.success ? this.passiveOrders = response.data :  null;
      console.log(this.passiveOrders);   
    })
  }

  getRestaurantDetailsByRestaurantId(restaurantId:string) {
    this.restaurantService.getRestaurantDetailsByRestaurantId(restaurantId).subscribe(response=>{
      response.success ? this.restaurant = response.data : null
    })
  }

}
