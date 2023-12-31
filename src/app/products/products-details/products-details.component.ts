import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { flush } from '@angular/core/testing';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit{

  productId!:string;
  product!:Product
  productQuantity:number=1;
  addReviewClicked:boolean = false;
  reviewForm!:FormGroup
  isSubmitClicked:boolean = false;

  constructor(
    private productsService:ProductsService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toater:ToastrService
  ){
    this.activatedRoute.params.subscribe((params)=>{
      this.productId = params['productId']
    })
  }
  
  ngOnInit(): void {
    this.productsService.getProductDetails(this.productId).subscribe(
      (Data:any)=>{
        this.product=Data.product
      }
    )

    this.reviewForm = this.formBuilder.group({
      rating: [ ,Validators.required],
      review: []
    })
  }

  toggleAddReview(){
    if(this.addReviewClicked){
      this.addReviewClicked=false;
      this.reviewForm.reset();
      this.isSubmitClicked=false
    }
    else{
      let user = localStorage.getItem('userData');
      if(user){
        this.addReviewClicked=true;
      }
      else{
        this.toater.error("To add a review, please log in to your account")
      }
    }
  }

  onSubmitReview(){
    this.isSubmitClicked=true;
    if(this.reviewForm.valid){
      console.log(this.reviewForm.value)
      this.toater.success("Your review has been submitted")
      this.isSubmitClicked=false;
      this.toggleAddReview()
    }
  }

  get f (){
    return this.reviewForm.controls;
  }

  onAddToCart(){
    const productData:Product = {
      id: this.productId,
      name:this.product.name,
      price:this.product.price,
      imageUrl:this.product.imageUrl,
      quantity:this.productQuantity,
    }
    this.productsService.addToCart(productData)
  }

}
