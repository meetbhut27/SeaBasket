import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { productDetailsAPI, productsAPI } from 'src/app/shared/APIs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getProductsList(){
    return this.http.get(productsAPI).pipe(
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
