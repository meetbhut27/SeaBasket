import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderId!: string;
  orderDetails!: any
  orderTotalAmount!: number
  deliveryDate!:Date

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params: any) => {
      this.orderId = params.id
    })

    this.orderService.getOrderDetails(this.orderId).subscribe(
      (Data: any) => {
        this.orderDetails = Data.order
        this.orderTotalAmount = Data.orderTotal
        let dateObj = new Date(Data.order.createdAt);
        this.deliveryDate = new Date(dateObj.setDate(dateObj.getDate() + 7));
      }
    )
  }

  onCancelOrder(id:string){
    
    // sweet alert for confirmation
    Swal.fire({
      title: 'Cancel Order',
      text: 'Are you sure you want to cancel order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.cancelOrder(id).subscribe((Data:any)=>{
          this.toastr.success(Data.message)
          this.orderDetails.status = 'canceled'
        })
      } else {
        return;
      }
    });
  }

}
