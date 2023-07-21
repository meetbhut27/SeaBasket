import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Cart } from 'src/app/shared/models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  cart!:Cart

  constructor(
    private orderService: OrderService
  ){
    const localCart = localStorage.getItem('cart')
    if(localCart){
      this.cart = JSON.parse(localCart);
    }
  }

  ngOnInit(): void {
    // this.orderService.getCart().subscribe(
    //   (Data:any)=>{
    //     this.cart = Data.cart
    //   }
    // )
  }

  onRemoveClick(index: number){
    this.cart.Cart_Total = this.cart.Cart_Total - (this.cart.products[index].price* this.cart.products[index].quantity);
    this.cart.products.splice(index, 1);
    localStorage.setItem('cart',JSON.stringify(this.cart))
  }

}
