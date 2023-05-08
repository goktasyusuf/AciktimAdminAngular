import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Restaurant } from 'src/app/models/restaurant/Restaurant';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-editrestaurant',
  templateUrl: './editrestaurant.component.html',
  styleUrls: ['./editrestaurant.component.css']
})
export class EditrestaurantComponent implements OnInit {
  restaurants: Restaurant[];
  filter:string;
  constructor(private restaurantService: RestaurantService, private toastrService: ToastrService) { }
  ngOnInit(): void {
    this.getRestaurants();
  }

  getRestaurants() {
    this.restaurantService.getActiveRestaurants().subscribe(response => {
      response.success ? this.restaurants = response.data : null
    })
  }


  getImagePath(restaurant: Restaurant): string {
    let url: string;
    restaurant.imagePath == null ? url = "http://127.0.0.1:4200/Restaurant/noImage.png"
      : url = "http://127.0.0.1:4200/Restaurant/" + restaurant.imagePath;
    return url;
  }

  
  deleteRestaurant(restaurantId: string) {
    if (confirm("Restoranı silmek istediğinize emin misiniz ? ")) {
      this.restaurantService.deleteRestaurant(restaurantId).subscribe(response => {
        response.success ? this.toastrService.success("Restoran Başarıyla Silindi", "BAŞARILI") : null
        this.getRestaurants();
      })
    }
  }

}
