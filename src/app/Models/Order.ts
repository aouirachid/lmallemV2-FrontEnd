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

  constructor(config: {
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
  }) {
    this.id = config.id;
    this.orderNumber = config.orderNumber;
    this.orderPrice = config.orderPrice;
    this.orderDescription = config.orderDescription;
    this.orderDate = config.orderDate;
    this.orderDeliveredAt = config.orderDeliveredAt;
    this.service_id = config.service_id;
    this.client_id = config.client_id;
    this.handy_men_id = config.handy_men_id;
    this.orderStatus = config.orderStatus;
    this.orderLocation = config.orderLocation;
  }
}
