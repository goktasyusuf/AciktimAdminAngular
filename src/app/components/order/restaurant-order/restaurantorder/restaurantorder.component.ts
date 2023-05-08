import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Restaurant } from 'src/app/models/restaurant/Restaurant';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurantorder',
  templateUrl: './restaurantorder.component.html',
  styleUrls: ['./restaurantorder.component.css']
})
export class RestaurantorderComponent implements OnInit {
  restaurants:Restaurant[];
  filter:string;
  constructor(private toastrService:ToastrService, private restaurantService:RestaurantService){}
  ngOnInit(): void {
    this.getActiveRestaurants();
  }

  getActiveRestaurants() {
    this.restaurantService.getActiveRestaurants().subscribe(response=>{
      response.success ? this.restaurants = response.data : null 
      for (let i = 0; i < this.restaurants.length; i++) {
        this.restaurants[i].restaurantRate = (Math.floor(this.restaurants[i].restaurantRate))
      }
    })
  }


  
  getImagePath(restaurant: Restaurant): string {
    let url: string;
    restaurant.imagePath == null ? url = "http://127.0.0.1:4200/Restaurant/noImage.png"
      : url = "http://127.0.0.1:4200/Restaurant/"  + restaurant.imagePath;
    return url;
  }

}

