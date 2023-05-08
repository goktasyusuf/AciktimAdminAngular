export interface Order {
    id:string;
    customerId:string;
    firstName:string;
    lastName:string;
    restaurantId:string;
    restaurantName:string;
    orderDescription:string;
    address:string;
    orderDate:string;
    orderStatus:string;
    estimatedTime:string;
    menus:any[]
}