import { Component } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  cartCount : number = 0;
  searchTerm : string ='';
  constructor(private cartService: CartService){}

  ngOnInit(){
    this.cartService.getProducts().subscribe((res) => {
      this.cartCount = res.length;
    })
  }

onSearch(searchString : Event): void {
  this.searchTerm = (searchString.target as HTMLInputElement).value;
  this.cartService.searchSubject.next(this.searchTerm);
}



}