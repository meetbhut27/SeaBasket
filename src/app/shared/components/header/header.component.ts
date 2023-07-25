import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLogedIn: boolean = false;
  userName!: string;
  userSubscription!: Subscription;
  serchName!: string;

  constructor(
    private helperService: HelperService,
    public router:Router,
    public productsService: ProductsService
    ) { }

  ngOnInit(): void {
    this.helperService.updateUserData();
    this.userSubscription = this.helperService.getUserData().subscribe((Data: any) => {
      this.userName = Data;
      if (this.userName) {
        this.isLogedIn = true;
      } else {
        this.isLogedIn = false;
      }
    })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onSerchClick(){
    this.productsService.serchProducts(this.serchName).subscribe((Data)=>{
    })
  }

}
