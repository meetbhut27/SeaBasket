import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { getCartAPI, orderDetailsAPI } from 'src/app/shared/APIs';

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

  getCart(){
    return this.http.get(getCartAPI).pipe(
      map((res)=>{
        return res;
      })
    )
  }
}
