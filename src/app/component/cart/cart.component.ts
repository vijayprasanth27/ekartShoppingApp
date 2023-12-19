import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  public cartItemList : any = [];
  public grandTotal : number = 0;

  constructor(private cartService:CartService){}
  ngOnInit(): void {
     this.cartService.getProducts().subscribe((res:any) => {
      this.cartItemList = res;
      this.grandTotal = this.cartService.getTotalPrice();
     })
     
  }

  removeItemFromCart(item:any){
    this.cartService.removeItemFromCart(item);
  }

  emptyCart(){
    this.cartService.emptyCart();
  }

}
