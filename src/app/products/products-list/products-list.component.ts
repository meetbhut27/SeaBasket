import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from 'src/app/shared/models/product';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit{

  products:Product[]=[];
  totalProducts:number = 0;

  constructor(
    private productsService: ProductsService
  ){}

  ngOnInit(): void {
    this.productsService.getProductsList().subscribe(
      (Data:any)=>{
        this.products=Data.products
        this.totalProducts=Data.totalProducts
      }
    )
  }
  
}
