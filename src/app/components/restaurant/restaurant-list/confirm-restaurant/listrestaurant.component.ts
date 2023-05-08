import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Restaurant } from 'src/app/models/restaurant/Restaurant';
import { CategoryService } from 'src/app/services/category/category.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-listrestaurant',
  templateUrl: './listrestaurant.component.html',
  styleUrls: ['./listrestaurant.component.css']
})
export class ListrestaurantComponent implements OnInit {
  isChecked: boolean;
  restaurants:Restaurant[];
  categoryName:string;
  filter:string;
  constructor(private toastrService:ToastrService,private restaurantService:RestaurantService
    ,private categoryService:CategoryService,private router:Router){}
  ngOnInit(): void {
    this.getPassiveRestaurants();
  }
  toggleEditable() {
    this.isChecked = !this.isChecked;
  }

  getPassiveRestaurants() {
    this.restaurantService.getPassiveRestaurants().subscribe(response=>{
      response.success ? this.restaurants = response.data : null 
    })
  }

  getImagePath(restaurant: Restaurant): string {
    let url: string;
    restaurant.imagePath == null ? url = "http://127.0.0.1:4200/Restaurant/noImage.png"
      : url = "http://127.0.0.1:4200/Restaurant/" + restaurant.id + "/" + restaurant.imagePath;
    return url;
  }

  getCategoryName(categoryId:string) {
    this.categoryService.getCategoryById(categoryId).subscribe(response=>{
      response.success ? this.categoryName = response.data.categoryName : null
    })
  }

  updateRestaurant(restaurant:Restaurant) {
    if (confirm("Restoranı kabul etmek istediğinize emin misiniz ? ")) {
      this.restaurantService.updateRestaurant(restaurant).subscribe(response => {
        response.success ? this.toastrService.success("Restoran başarıyla kabul edildi.", "BAŞARILI") : null
        setTimeout(() => {
          this.router.navigate(["/restaurant/list"])
        }, 1000)
      })
    }
  }

  deleteRestaurant(restaurantId:string) {
    if(confirm("Restoranı reddetmek istediğinizden emin misiniz ? ")) 
    {
      this.restaurantService.deleteRestaurant(restaurantId).subscribe(response=>{
        response.success ? this.toastrService.success("Restoran Reddedildi","BAŞARILI") : null
        this.getPassiveRestaurants();
      })
    }
  }
}
