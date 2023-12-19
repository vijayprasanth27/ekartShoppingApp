import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any = [];
  public itemSubject = new BehaviorSubject<any>([]);
  public searchSubject = new BehaviorSubject<string>('');

  constructor() { }

  getProducts(){
    return this.itemSubject.asObservable();
  }

  addToCart(item: any){
    this.cartItemList.push(item);
    this.itemSubject.next(this.cartItemList);
    this.getTotalPrice();
  }

  getTotalPrice(){
    let totalPrice = 0;
    this.cartItemList.map((item:any) => {
      totalPrice += item.total;
    })
    return totalPrice;
  }

  removeItemFromCart(product:any){
    this.cartItemList.map((item:any,index:any) => {
      if(product.id == item.id){
        this.cartItemList.splice(index,1);
      }
    });
    this.itemSubject.next(this.cartItemList);
  }

  emptyCart(){
    this.cartItemList = [];
    this.itemSubject.next(this.cartItemList);
  }
}
