import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { CustomerEditComponent } from './components/customer/customer-edit/customer-edit.component';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CustomerPipePipe } from './pipes/customer-pipe.pipe';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { ListrestaurantComponent } from './components/restaurant/restaurant-list/confirm-restaurant/listrestaurant.component';
import { EditrestaurantComponent } from './components/restaurant/restaurant-edit/editrestaurant/editrestaurant.component';
import { EditpageComponent } from './components/restaurant/edit-page/editpage/editpage.component';
import { RestaurantorderComponent } from './components/order/restaurant-order/restaurantorder/restaurantorder.component';
import { OrderdetailComponent } from './components/order/order-detail/orderdetail/orderdetail.component';
import { RestaurantPipePipe } from './pipes/restaurant-pipe.pipe';
import { OrderPipe } from './pipes/order.pipe';
import { OrderCustomerIdPipe } from './pipes/order-customer-id.pipe';
import { OrderlistComponent } from './components/order/orderlist/orderlist.component';
import { ChartModule } from 'angular-highcharts';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DenemeComponent } from './components/chart/deneme/deneme.component';
import { MailsComponent } from './components/mails/mails.component';
import { MailDetailComponent } from './components/mail-detail/mail-detail.component';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RestaurantComponent,
    CustomerListComponent,
    CustomerEditComponent,
    CustomerPipePipe,
    ListrestaurantComponent,
    EditrestaurantComponent,
    EditpageComponent,
    RestaurantorderComponent,
    OrderlistComponent,
    OrderdetailComponent,
    RestaurantPipePipe,
    OrderPipe,
    OrderCustomerIdPipe,
    DenemeComponent,
    MailsComponent,
    MailDetailComponent,
   
  ],
  imports: [
    BrowserModule,
    ChartModule,
    AppRoutingModule,
    DragDropModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      preventDuplicates: false,
      closeButton: true,
      countDuplicates: true,
      positionClass: "toast-bottom-right",
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
