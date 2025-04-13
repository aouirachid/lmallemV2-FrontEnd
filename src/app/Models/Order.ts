export class Order {
  id: number;
  orderNumber: string;
  orderPrice: number;
  orderDescription: string;
  orderDate: Date;
  orderDeliveredAt: Date;
  service_id: number;
  client_id: number;
  handy_men_id: number;
  orderStatus: string;
  orderLocation: string;
  constructor(
    id: number,
    orderNumber: string,
    orderPrice: number,
    orderDescription: string,
    orderDate: Date,
    orderDeliveredAt: Date,
    service_id: number,
    client_id: number,
    handy_men_id: number,
    orderStatus: string,
    orderLocation: string
  ) {
    this.id = id;
    this.orderNumber = orderNumber;
    this.orderPrice = orderPrice;
    this.orderDescription = orderDescription;
    this.orderDate = orderDate;
    this.orderDeliveredAt = orderDeliveredAt;
    this.service_id = service_id;
    this.client_id = client_id;
    this.handy_men_id = handy_men_id;
    this.orderStatus = orderStatus;
    this.orderLocation = orderLocation;
  }
}
