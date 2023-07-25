import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../services/order.service';
import { Address } from 'src/app/shared/models/address';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/shared/models/cart';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  paymentForm!: FormGroup;
  cardDetailsFrom!: FormGroup;
  upiIdForm!: FormGroup;
  userAddress!: Address;
  newAddress!: FormGroup;
  display:string = 'payment'
  cart!:Cart
  checkoutMode!:string
  buyNowProductId!:string
  buyNowProductQuantity!:number
  buyNowProduct!:Product

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private toastr: ToastrService,
    private activatedRoute:ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((params)=>{
      this.checkoutMode=params['from'];

      if(this.checkoutMode=='buyNow'){
        this.buyNowProductId=params['productId'];
        this.buyNowProductQuantity=params['quantity'];
        this.orderService.getProductDetails(this.buyNowProductId).subscribe((Data:any)=>{
          this.buyNowProduct=Data.product
        })
      }
    })

    this.orderService.getUserProfile().subscribe((Data: any) => {
       this.userAddress = Data.addresses[0] 
    })

    const localCart = localStorage.getItem('cart')
    if(localCart){
      this.cart = JSON.parse(localCart);
    }
  }

  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
      paymentMethod: [, Validators.required]
    })

    this.cardDetailsFrom = this.formBuilder.group({
      cardNumber: [, [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      cardHolderName: [, [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
      expireMonth: [1, Validators.required],
      expireYear: [2023, Validators.required]
    })

    this.upiIdForm = this.formBuilder.group({
      upiId: [, [Validators.required, Validators.pattern('^[a-zA-Z0-9.\-_]{3,}@[a-zA-Z]{2,}$')]]
    })

    this.newAddress = this.formBuilder.group({
      name: [, [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      address: [, [Validators.required]],
      city: [, [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      state: [, [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      zip: [, [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    })
  }

  get f() {
    return this.paymentForm.controls
  }

  get f2() {
    return this.newAddress.controls
  }

  onVerifyCard() {
    if(this.cardDetailsFrom.invalid){
      this.toastr.error('Please Enter Valid Card details to continue')
    }
    else{
      this.toastr.success('Your card details has been verified')
    }
  }

  onVerifyUPI() {
    if(this.upiIdForm.invalid){
      this.toastr.error('Please Enter Valid Upi id to continue')
    }
    else{
      this.toastr.success('Your UPI details has been verified')
    }
  }

  changePaymentMethod(){
    this.display='payment';
  }

  changeOrviewAddress(){
    if(this.paymentForm.valid){
      this.display='address';
    }
    else {
      this.toastr.error('Please first enter payment Details')
    }
  }

  onPaymnetContinue(paymentData: { paymentMethod: string; }) {
    if (this.paymentForm.invalid) {
      this.toastr.error('please select payment method')
    }
    else{
      if(paymentData.paymentMethod == 'card' && this.cardDetailsFrom.invalid){
        this.toastr.error('Please Enter Valid Card details to continue')
      }
      else if(paymentData.paymentMethod == 'upi'&& this.upiIdForm.invalid){
        this.toastr.error('Please Enter Valid Upi id to continue')
      }
      else{
        this.display='address'
      }
    }
  }

  onAddressContinue() {
    if (!this.userAddress && this.newAddress.invalid) {
      this.toastr.error('Pleace Enter Valid Address details for continued.')
    }
    this.display='placeorder'
  }

  onPlaceOrder(){
    if(this.checkoutMode=='cart'){
      let i=0
      this.cart.products.forEach((product)=>{
        this.orderService.addToCart(product.id,product.quantity).subscribe((Data)=>{
          console.log(Data)
          i++
          if(i==this.cart.products.length){
            this.orderService.placeOrder().subscribe((Data:any)=>{
              this.toastr.success(Data.message)
              localStorage.removeItem('cart')
            })
          }
        })
      })
    }
    else {
      this.orderService.addToCart(this.buyNowProductId,this.buyNowProductQuantity).subscribe((Data)=>{
        this.orderService.placeOrder().subscribe((Data:any)=>{
          this.toastr.success(Data.message)
        })
      })
    }


  }

}





