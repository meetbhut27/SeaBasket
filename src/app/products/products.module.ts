import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { ProductsRoutingModule } from './products-routing.module';
import { BarRatingModule } from "ngx-bar-rating"; 

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsDetailsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    BarRatingModule
  ]
})
export class ProductsModule { }
