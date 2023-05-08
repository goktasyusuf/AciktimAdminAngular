import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category/Category';
import { CustomerDetails } from 'src/app/models/customer/customerDetails';
import { MaxOrderDto } from 'src/app/models/order/maxOrderDto';
import { Order } from 'src/app/models/order/order';
import { OrdersByDate } from 'src/app/models/order/ordersByDateDto';
import { Restaurant } from 'src/app/models/restaurant/Restaurant';
import { RestaurantOrderNumber } from 'src/app/models/restaurant/restaurantOrderNumber';
import { CategoryService } from 'src/app/services/category/category.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { OrderService } from 'src/app/services/order/order.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-deneme',
  templateUrl: './deneme.component.html',
  styleUrls: ['./deneme.component.css']
})
export class DenemeComponent implements OnInit {
  profitByMonths: number[] = [0, 0, 0, 0];
  orders: Order[];
  todayOrders: OrdersByDate;
  yesterdayOrders: OrdersByDate;
  restaurantOrderNumbers: RestaurantOrderNumber[];
  noShow: boolean = false;
  linechart: any;
  piechart: any;
  maxOrders: MaxOrderDto[];
  piechartcategory: any;
  piechartorder: any;
  piechartmaxorder: any;
  customersNumberWhoTodayRegister : number;
  todayGain: number = 0;
  categories: Category[];
  orderNumbers: any = new Array(0);
  restaurants:Restaurant[];
  customers:CustomerDetails[];


  constructor(private orderService: OrderService, private toastrService: ToastrService,
    private restaurantService: RestaurantService, private categoryService: CategoryService,
    private customerService: CustomerService) { }
  ngOnInit(): void {

    this.getAllOrders();
    this.createLineChart();
    this.createPieChart();
    this.getCategories();
    this.createPieChartForCategories();
    this.createPieChartForOrders();
    this.getMax10Orders();
    this.createPieChartForMaxOrders();
    this.calculateTodayGain();
    this.getCustomersByTodayRegisterDate();
    this.getRestaurants();
    this.getCustomers();

  }

  getCustomers() {
    this.customerService.getCustomerDetails().subscribe(response=>{
      response.success ? this.customers = response.data : this.toastrService.error("Bir hata meydana geldi.","HATA")    
    })

  }


  getCustomersByTodayRegisterDate() {
    this.customerService.GetCustomersByTodayRegisterDate().subscribe(response=>{
      response.success ? this.customersNumberWhoTodayRegister = response.data : this.toastrService.error("Bir hata meydana geldi.","HATA")   
    })
  }

  getMax10Orders(successCallBack?: () => void) {
    this.customerService.getMax10Orders().subscribe(response => {
      response.success ? this.maxOrders = response.data : this.toastrService.error("Bir hata meydana geldi", "HATA");
      if (successCallBack) {
        successCallBack();
      }

    })
  }

  calculateTodayGain() {
    const date = new Date();
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    
    this.getAllOrders(() => {
      for (let i = 0; i < this.orders.length; i++) {
        for (let j = 0; j < this.orders[i].menus.length; j++) {
          let split = this.orders[i].orderDate.split(/[,\s]+/)[0];
          if (split == formattedDate ) {
             this.todayGain+= (((this.orders[i].menus[j].orderPrice) * (this.orders[i].menus[j].quantity)) * 10) / 100
          }
        }
      }
    })

  }

  createPieChartForMaxOrders() {
    this.getMax10Orders(() => {
      let data = [];
      for (let i = 0; i < this.maxOrders.length; i++) {
        data.push([this.maxOrders[i].customerName, this.maxOrders[i].orderNumber]);
      }
      this.piechartmaxorder = new Chart
        (
          {
            chart: {
              plotBorderWidth: null,
              plotShadow: false
            },
            accessibility: {
              enabled: false
            },
            title: {
              text: 'En Çok Sipariş Veren 10 Kullanıcı'
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
              pie: {
                shadow: false,
                center: ['50%', '50%'],
                size: '100%',
                innerSize: '20%'
              }
            },
            series: [{
              type: 'pie',
              name: 'Sipariş Oranı',
              data: data
            }
            ]
          }
        )
    })
  }

  getCategories(successCallBack?: () => void) {
    this.categoryService.getAllCategories().subscribe(response => {
      response.success ? this.categories = response.data : this.toastrService.error("Bir hata meydana geldi", "HATA");
      if (successCallBack) {
        successCallBack();
      }

    })
  }

  getOrdersByDate(successCallBack?: () => void) {
    this.orderService.getTodayOrders().subscribe(response => {
      response.success ? this.todayOrders = response.data : this.toastrService.error("Bir hata meydana geldi", "HATA")

      this.orderService.getYesterdayOrders().subscribe(response => {
        response.success ? this.yesterdayOrders = response.data : this.toastrService.error("Bir hata meydana geldi", "HATA")
        if (successCallBack) {
          successCallBack();
        }
      })
    })
  }

  createPieChartForOrders() {
    this.getOrdersByDate(() => {
      let data = [];
      data.push([this.todayOrders.date + " (Bugün)", this.todayOrders.count]);
      data.push([this.yesterdayOrders.date + " (Dün)", this.yesterdayOrders.count]);

      this.piechartorder = new Chart
        (
          {
            chart: {
              plotBorderWidth: null,
              plotShadow: false
            },
            accessibility: {
              enabled: false
            },
            title: {
              text: 'Dün VS Bugün Satış Sayıları'
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
              pie: {
                shadow: false,
                center: ['50%', '50%'],
                size: '85%',
                innerSize: '20%'
              }
            },
            series: [{
              type: 'pie',
              name: 'Satış Oranı',
              data: data
            }
            ]
          }
        )
    })
  }

  createPieChartForCategories() {
    this.getCategories(() => {
      let data = [];
      let number = 100 / this.categories.length;
      for (let i = 0; i < this.categories.length; i++) {
        data.push([this.categories[i].categoryName, number]);
      }
      this.piechartcategory = new Chart
        (
          {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: 0,
              plotShadow: false
            },
            accessibility: {
              enabled: false,
              point: {
                valueSuffix: '%'
              }
            },
            title: {
              text: 'Var Olan </br> Kategoriler',
              align: 'center',
              verticalAlign: 'middle',
              y: 60
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
              pie: {
                dataLabels: {
                  enabled: true,
                  distance: -50,
                  style: {
                    fontWeight: 'bold',
                    color: 'white'
                  }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%'],
                size: '110%'
              }
            },

            series: [{
              type: 'pie',
              name: 'Satış Oranı',
              innerSize: '50%',
              data: data
            }
            ]
          }
        )
    })

  }

  getAllOrders(successCallBack?: () => void) {
    this.orderService.getAllOrders().subscribe(response => {
      response.success ? this.orders = response.data : this.toastrService.error("Bir hata meydana geldi.", "HATA")
      if (successCallBack) {
        successCallBack();
      }
    })
  }

  getRestaurantOrderNumbers(successCallBack?: () => void) {
    this.restaurantService.getRestaurantsOrderNumber().subscribe(response => {
      response.success ? this.restaurantOrderNumbers = response.data : this.toastrService.error("Bir hata meydana geldi.", "HATA");
      if (successCallBack) {
        successCallBack();
      }

    })
  }

  splitProfitByMonths(successCallBack?: () => void) {
    this.getAllOrders(() => {

      for (let i = 0; i < this.orders.length; i++) {
        const ay = this.orders[i].orderDate.split('.');
        let ayNumber = parseInt(ay[1])
        for (let j = 0; j < this.orders[i].menus.length; j++) {
          let price = (((this.orders[i].menus[j].orderPrice) * (this.orders[i].menus[j].quantity)) * 10) / 100
          if (0 < ayNumber && ayNumber <= 3) {
            this.profitByMonths[0] += price;
          }
          else if (4 <= ayNumber && ayNumber <= 6) {
            this.profitByMonths[1] += price;
          }
          else if (7 <= ayNumber && ayNumber <= 9) {
            this.profitByMonths[2] += price;
          }
          else {
            this.profitByMonths[3] += price;
          }
        }
      }
      if (successCallBack) {
        successCallBack();
      }
    })
  }

  createLineChart() {
    this.splitProfitByMonths(() => {
      this.linechart = new Chart({
        chart: {
          type: 'line'
        },
        yAxis: {
          title: {
            text: "Kazanılan Miktar  (TL)", style: { fontSize: "20" }
          }
        },
        accessibility: {
          enabled: false
        },
        title: {
          text: 'Gelir Grafiği'
        },
        credits: {
          enabled: false
        },
        xAxis: {
          title: {
            text: "Aylar", style: { fontSize: "20" }
          },
          categories: ["Ocak-Mart", "Nisan-Haziran", "Temmuz-Eylül", "Ekim-Aralık"]
        },
        series: [{
          name: 'Line 1',
          data: [this.profitByMonths[0], this.profitByMonths[1], this.profitByMonths[2], this.profitByMonths[3]],
          type: undefined
        }]
      });
    });

  }

  createPieChart() {
    this.getRestaurantOrderNumbers(() => {
      for (let i = 0; i < this.restaurantOrderNumbers.length; i++) {
        this.orderNumbers.push(this.restaurantOrderNumbers[i]);
      }
      let data = [];
      for (let i = 0; i < this.orderNumbers.length; i++) {
        data.push([this.orderNumbers[i].restaurantName, this.orderNumbers[i].restaurantOrderNumber]);
      }
      this.piechart = new Chart
        (
          {
            chart: {
              plotBorderWidth: null,
              plotShadow: false
            },
            accessibility: {
              enabled: false
            },
            title: {
              text: 'Restoran Satış Grafiği'
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
              pie: {
                shadow: false,
                center: ['50%', '50%'],
                size: '85%',
                innerSize: '20%'
              }
            },
            series: [{
              type: 'pie',
              name: 'Satış Oranı',
              data: data
            }
            ]
          }
        )
    })
  }

  changeVisibility() {
    this.noShow = !this.noShow
  }

  giveClass() {
    if (this.noShow == true) {
      return 'resizable'
    }
    else {
      return ''
    }
  }

  getRestaurants() {
    this.restaurantService.getActiveRestaurants().subscribe(response=>{
      response.success ? this.restaurants = response.data : this.toastrService.error("Bir hata meydana geldi.","HATA")
    })
  }


}
