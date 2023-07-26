import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { buyNowAPI, cartAPI, orderDetailsAPI, placeOrderAPI, productDetailsAPI, profileAPI } from 'src/app/shared/APIs';
import { HelperService } from 'src/app/shared/services/helper.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient,
    private helperService: HelperService
  ) { }

  getOrderDetails(id: string) {
    this.helperService.startLoading()
    return this.http.get(orderDetailsAPI + id).pipe(
      map((res) => {
        this.helperService.stoploading()
        return res;
      })
    )
  }

  cancelOrder(id: string) {
    this.helperService.startLoading()
    return this.http.post(orderDetailsAPI + id,{}).pipe(
      map((res) => {
        this.helperService.stoploading()
        return res;
      })
    )
  }

  addToCart(productId:string,quantity:number){
    this.helperService.startLoading()
    return this.http.post(cartAPI,{productId,quantity}).pipe(
      map((res)=>{
        this.helperService.stoploading()
        return res;
      })
    )
  }

  getUserProfile() {
    this.helperService.startLoading()
    return this.http.get(profileAPI).pipe(
      map((res) => {
        this.helperService.stoploading()
        return res;
      })
    )
  }

  placeOrder(){
    this.helperService.startLoading()
    return this.http.post(placeOrderAPI,{}).pipe(
      map((res)=>{
        this.helperService.stoploading()
        return res;
      })
    )
  }

  buyNow(productId: any){
    this.helperService.startLoading()
    return this.http.post(buyNowAPI,productId).pipe(
      map((res)=>{
        this.helperService.stoploading()
        return res;
      })
    )
  }

  getProductDetails(productId: string){
    this.helperService.startLoading()
    return this.http.get(productDetailsAPI+productId).pipe(
      map((res)=>{
        this.helperService.stoploading()
        return res;
      })
    )
  }

}
