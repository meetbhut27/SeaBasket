import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  categories:string[]=[];
  trendingProducts:Product[]=[]
  products1:Product[]=[]
  products2:Product[]=[]
  products3:Product[]=[]

  constructor(
    private homeService: HomeService
  ){}

  ngOnInit(): void {
    this.homeService.getCategories().subscribe(
      (Data:any)=>{
        this.categories=Data.categories
      }
    )

    this.homeService.getTrendingProducts().subscribe(
      (Data:any)=>{
        this.trendingProducts=Data.trendingProducts
        this.trendingProducts?.forEach((product)=>{
          let i=1
          if(i<=3){
            this.products1.push(product)
          }
          else if(i<=6){
            this.products2.push(product)
          }
          else{
            this.products3.push(product)
          }
          i++;
        })
      }
    )

  }

}
