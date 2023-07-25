import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { buyNowAPI, cartAPI, orderDetailsAPI, placeOrderAPI, productDetailsAPI, profileAPI } from 'src/app/shared/APIs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  getOrderDetails(id: string) {
    return this.http.get(orderDetailsAPI + id).pipe(
      map((res) => {
        return res;
      })
    )
  }

  cancelOrder(id: string) {
    return this.http.post(orderDetailsAPI + id,{}).pipe(
      map((res) => {
        return res;
      })
    )
  }

  addToCart(productId:string,quantity:number){
    return this.http.post(cartAPI,{productId,quantity}).pipe(
      map((res)=>{
        return res;
      })
    )
  }

  getUserProfile() {
    return this.http.get(profileAPI).pipe(
      map((res) => {
        return res;
      })
    )
  }

  placeOrder(){
    return this.http.post(placeOrderAPI,{}).pipe(
      map((res)=>{
        return res;
      })
    )
  }

  buyNow(productId: any){
    return this.http.post(buyNowAPI,productId).pipe(
      map((res)=>{
        return res;
      })
    )
  }

  getProductDetails(productId: string){
    return this.http.get(productDetailsAPI+productId).pipe(
      map((res)=>{
        return res;
      })
    )
  }

}
