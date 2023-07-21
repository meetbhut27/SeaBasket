import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { categoriesAPI, trendingProductsAPI } from 'src/app/shared/APIs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }

  getCategories(){
    return this.http.get(categoriesAPI).pipe(
      map((res)=>{
        return res;
      })
    )
  }

  getTrendingProducts(){
    return this.http.get(trendingProductsAPI).pipe(
      map((res)=>{
        return res;
      })
    )
  }

}
