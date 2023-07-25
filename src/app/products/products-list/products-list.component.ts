import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from 'src/app/shared/models/product';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  totalProducts: number = 0;
  sortBy: string | null = null
  categories: string[] = []
  priceRange: string = 'all'
  rating: string = 'all'
  category: string = 'all'

  constructor(
    private productsService: ProductsService,
    private activatedRoute:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.productsService.getCategories().subscribe(
      (Data: any) => {
        this.categories = Data.categories
      }
    )

    this.activatedRoute.queryParams.subscribe((params)=>{
      if(params['category']){
        this.category=params['category']
        this.onFiltersChanged()
      }
      else{
        this.productsService.getProductsList().subscribe(
          (Data: any) => {
            this.products = Data.products
            this.totalProducts = Data.totalProducts
          }
        )
      }     
    })

    this.productsService.getProductsSubject().subscribe((Data)=>{
      this.products = Data
      this.sortBy= null;
      this.category = 'all';
      this.rating = 'all';
      this.priceRange = 'all';
    })
  }

  onSortByChange() {
    if (this.sortBy == 'price:desc') {
      this.products.sort((a,b)=> b.price - a.price);
    }
    else if (this.sortBy == 'price:asc') {
      this.products.sort((a,b)=> a.price - b.price);
    }
    else if (this.sortBy == 'name') {
      this.products.sort((a,b)=> a.name.localeCompare(b.name));
    }
  }

  onFiltersChanged() {
    this.sortBy=null;
    let minPrice: number = 0
    let maxPrice: number = 0

    if (this.priceRange == 'less1k') {
      minPrice = 0, maxPrice = 1000
    }
    else if (this.priceRange == '1kTo3k') {
      minPrice = 1000, maxPrice = 3000
    }
    else if (this.priceRange == '3k+') {
      minPrice = 3000, maxPrice = 100000000
    }

    this.productsService.filterProducts(minPrice, maxPrice, this.category, this.rating).subscribe((Data: any) => {
      this.products = Data
    })
  }

}


