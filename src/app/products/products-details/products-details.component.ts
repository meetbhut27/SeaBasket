import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit{

  productId!:string;

  constructor(
    private productsService:ProductsService,
    private activatedRoute: ActivatedRoute
  ){
    this.activatedRoute.params.subscribe((params)=>{
      this.productId = params['productId']
    })
  }

  ngOnInit(): void {
    this.productsService.getProductDetails(this.productId).subscribe(
      (Data)=>{
        console.log(Data);
      }
    )
  }

}
