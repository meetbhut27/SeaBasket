import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', loadChildren: () => import('../home/home.module').then(m => m.HomeModule) },
      { path: 'profile', loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule) },
      { path: 'order', loadChildren: () => import('../order/order.module').then(m => m.OrderModule) },
      { path: 'products', loadChildren: () => import('../products/products.module').then(m => m.ProductsModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
