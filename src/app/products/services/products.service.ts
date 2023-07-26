import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, map } from 'rxjs';
import { categoriesAPI, productDetailsAPI, productSearchAPI, productsAPI, productsFilterAPI, sortedProductAPI } from 'src/app/shared/APIs';
import { Cart } from 'src/app/shared/models/cart';
import { Product } from 'src/app/shared/models/product';
import { HelperService } from 'src/app/shared/services/helper.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http:HttpClient,
    private toastr:ToastrService,
    private helperService:HelperService
  ) { }

  public productsSubject = new BehaviorSubject<any[]>([]);

  getProductsSubject(){
    return this.productsSubject.asObservable()
  }

  getProductsList(){
    this.helperService.startLoading()
    return this.http.get(productsAPI).pipe(
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

  addToCart(productData:Product){
    this.helperService.startLoading()
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
    this.helperService.stoploading()
    this.toastr.success('Product Successfully Added to Cart')
  }
   
  sortProducts(sort:string,order:string){
    this.helperService.startLoading()
    const params = new HttpParams().set('sort',sort).set('order',order)
    return this.http.get(sortedProductAPI,{params}).pipe(
      map((res)=>{
      this.helperService.stoploading()
      return res
    })
    )
  }

  getCategories(){
    this.helperService.startLoading()
    return this.http.get(categoriesAPI).pipe(
      map((res:any)=>{
        this.helperService.stoploading()
        return res;
      })
    )
  }

  filterProducts(minPrice:number,maxPrice:number,category:string,rating:string){
    this.helperService.startLoading()
    let params = new HttpParams()

    if(minPrice!=0 || maxPrice!=0){
      params=params.append('minPrice',minPrice)
      params=params.append('maxPrice',maxPrice)
    }

    if(category!="all"){
      params=params.append('category',category)
    }

    if(rating!="all"){
      params=params.append('rating',rating)  
    }  

    return this.http.get(productsFilterAPI,{params}).pipe(
      map((res)=>{
        this.helperService.stoploading()
        return res
      })
    )
  }

  serchProducts(serchName:string){
    this.helperService.startLoading()
    const params = new HttpParams().set('name',serchName)
    return this.http.get(productSearchAPI,{params}).pipe(
      map((res:any)=>{
        this.productsSubject.next(res.products)
        this.helperService.stoploading()
        return res;
      })
    )
  }

}
