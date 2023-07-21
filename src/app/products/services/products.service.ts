import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { addTocartAPI, productDetailsAPI, productsAPI } from 'src/app/shared/APIs';

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

  addToCart(productData:any){
    const { id, name, price, imageUrl, quantity } = productData
    const user = localStorage.getItem('userData')
    if(user){
      const userId = JSON.parse(user).userId
      const cart = {
        id: userId,
        products:[
          { id, name, price, imageUrl, quantity }
        ]
        
  
      }
      
    }
  }

}
