import { ActiveItem, HistoryItem, MakeItem } from "../models/item";

export interface MakeOrder{
    comment: string,
    address: string,
    userId: number,
    salesmanId: number,
    item: MakeItem,
}
export interface Createorder {
    id: string;
    comment: string;
    address: string;
    creationTime: Date;
    deliveryTime: Date;
    price: number;
    status: string;
    item: {
      articleName: string;
      id: number;
      quantity: number;
    };
  }



  export interface Order {
    id: number,
    item: ActiveItem,
    comment: string,
    address: string,
    creation: Date,
    delivery: Date,
    price: number,
    status: string
}

export interface OrderHistory {
    id: number,
    item: HistoryItem,
    comment: string,
    address: string,
    creation: Date,
    delivery: Date,
    price: number,
    status: string
}


  export interface CancelOrder{
    userId: number,
    orderId: number,
}