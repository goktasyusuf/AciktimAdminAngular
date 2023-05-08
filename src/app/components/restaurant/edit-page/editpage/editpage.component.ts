import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category/Category';
import { Restaurant } from 'src/app/models/restaurant/Restaurant';
import { CategoryService } from 'src/app/services/category/category.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-editpage',
  templateUrl: './editpage.component.html',
  styleUrls: ['./editpage.component.css']
})
export class EditpageComponent implements OnInit {
  restaurant: Restaurant;
  restaurantId: any;
  categories: Category[];
  updateRestaurantForm: FormGroup;
  constructor(private restaurantService: RestaurantService, private toastrService: ToastrService
    , private route: ActivatedRoute, private formBuilder: FormBuilder
    , private categoryService: CategoryService, private router: Router) { }
  ngOnInit(): void {
    this.getRestaurantId();
    this.getRestaurantDetails();
    this.createFormGroup();
    this.getCategories();
  }

  getRestaurantDetails() {
    this.restaurantService.getRestaurantDetailsByRestaurantId(this.restaurantId).subscribe(response => {
      response.success ? this.restaurant = response.data : null;
      this.updateRestaurantForm.patchValue(response.data);
    })
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe(response => {
      response.success ? this.categories = response.data : null
    })
  }

  createFormGroup() {
    this.updateRestaurantForm = this.formBuilder.group
      (
        {
          id: ["", Validators.required],
          restaurantName: ["", Validators.required],
          restaurantAddress: ["", Validators.required],
          mailAddress: ["", Validators.required],
          openingTime: ["", Validators.required],
          closingTime: ["", Validators.required],
          categoryId: ["", Validators.required],
          minCartPrice: ["", Validators.required], //+
          restaurantRate: ["", Validators.required],
          phoneNumber: ["", Validators.required],
          taxNumber: ["", Validators.required],
          imagePath: ["", Validators.required]
        }
      );
  }

  updateRestaurant() {
    let model = Object.assign({}, this.updateRestaurantForm.value);
    if (confirm("Restoranı güncellemek istediğinizeemin misiniz ? ")) {
      this.restaurantService.updateRestaurant(model).subscribe(response => {
        response.success ? this.toastrService.success("Restoran başarıyla güncellendi.", "BAŞARILI") : null
        setTimeout(() => {
          this.router.navigate(["/restaurant/list"])
        }, 1000)
      })
    }
  }

  getRestaurantId() {
    this.restaurantId = this.route.snapshot.paramMap.get('id');
  }

  getImagePath(restaurant: Restaurant): string {
    let url: string;
    restaurant.imagePath == null ? url = "http://127.0.0.1:4200/Restaurant/noImage.png"
      : url = "http://127.0.0.1:4200/Restaurant/" + restaurant.id + "/" + restaurant.imagePath;
    return url;
  }

}
