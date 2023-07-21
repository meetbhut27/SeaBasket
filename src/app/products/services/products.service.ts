import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { productDetailsAPI, productsAPI } from 'src/app/shared/APIs';
import { Cart } from 'src/app/shared/models/cart';
import { Product } from 'src/app/shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient,private toastr:ToastrService) { }

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

  addToCart(productData:Product){
    const localCart = localStorage.getItem('cart')
    let cart!:Cart
    if(localCart){
      cart = JSON.parse(localCart);
      let isProductAlredyInCart:boolean = false
      cart.products.forEach((product)=>{
        if(product.id === productData.id){
          isProductAlredyInCart = true
        }
      })
      if(!isProductAlredyInCart){
        cart.products.push(productData)
        cart.Cart_Total = cart.Cart_Total + (productData.price * productData.quantity)
      }
      else{
        this.toastr.error('This item is already in cart')
        return 
      }
    }
    else {
      cart = {
        products:[
          productData
        ],
        Cart_Total: (productData?.quantity * productData.price)
      }
    }
    localStorage.setItem('cart',JSON.stringify(cart))  
    this.toastr.success('Product Successfully Added to Cart')
  }

}
