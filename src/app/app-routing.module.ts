import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';
import { ListrestaurantComponent } from './components/restaurant/restaurant-list/confirm-restaurant/listrestaurant.component';
import { EditrestaurantComponent } from './components/restaurant/restaurant-edit/editrestaurant/editrestaurant.component';
import { EditpageComponent } from './components/restaurant/edit-page/editpage/editpage.component';
import { OrderlistComponent } from './components/order/orderlist/orderlist.component';
import { RestaurantorderComponent } from './components/order/restaurant-order/restaurantorder/restaurantorder.component';
import { OrderdetailComponent } from './components/order/order-detail/orderdetail/orderdetail.component';
import { DenemeComponent } from './components/chart/deneme/deneme.component';
import { MailsComponent } from './components/mails/mails.component';
import { MailDetailComponent } from './components/mail-detail/mail-detail.component';

const routes: Routes = [{
  path: "", component: HomeComponent, children: 
  [
    {path:"" , component:DenemeComponent},
    {path:"mails" , component:MailsComponent},
    {path: "restaurant", component: RestaurantComponent },
    {path: "customer/list", component: CustomerListComponent },
    {path: "customer/edit/:id", component: CustomerEditComponent },
    {path: "customer/edit", component: CustomerEditComponent },
    {path: "restaurant", component: RestaurantComponent},
    {path: "restaurant/confirm", component: ListrestaurantComponent},
    {path: "restaurant/list", component: EditrestaurantComponent},
    {path: "restaurant/edit/:id", component: EditpageComponent},
    {path: "order/orderlist", component: OrderlistComponent},
    {path: "order/restaurantorder", component: RestaurantorderComponent},
    {path: "order/orderdetails/:id", component: OrderdetailComponent},
    {path: "mails/mail/:id", component: MailDetailComponent}


  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
