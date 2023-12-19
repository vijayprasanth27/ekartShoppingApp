import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  public products:any;
  public filterCategory :any;
  searchKey: string = "";
  constructor(private api: ApiService, private cartService: CartService){}

  ngOnInit(){
    this.api.getProducts().subscribe(res => {
      this.products = res;
      this.filterCategory = res;
      this.products.forEach((item:any) => {
        if(item.category === "men's clothing" || item.category === "women's clothing"){
          item.category = "fashion";
        }
        Object.assign(item,{quantity:1, total:item.price});
      });
    })

    this.cartService.searchSubject.subscribe(value =>{
      this.searchKey = value;
    })
 
  }

  addToCart(item: any){
    this.cartService.addToCart(item);
  }

  filter(category: string) {
    this.filterCategory =  this.products.filter((a:any)=>{
      if(a.category == category || category == ''){
        return a;
      }
    })
  }
}
