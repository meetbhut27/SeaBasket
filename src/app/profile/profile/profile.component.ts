import { Component } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { User } from 'src/app/shared/models/user';
import { Address } from 'src/app/shared/models/address';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Order } from 'src/app/shared/models/order';
import { HelperService } from 'src/app/shared/services/helper.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  isProfileEdit: boolean = false;
  userProfile!: User;
  userAddress!: Address;
  userOrders!: any[];
  editProfileForm!: FormGroup
  orders: Order[] = [];
  orderCount: number = 0

  constructor(
    private profileService: ProfileService,
    private formBulilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private helperService: HelperService) {

    // for get user profile data
    this.profileService.getUserProfile().subscribe(
      (Data: any) => {
        this.userProfile = Data?.profile
        this.userAddress = Data?.addresses[0]
        this.userOrders = Data?.orders
      }
    )

    this.profileService.getOrders().subscribe(
      (Data: any) => {
        this.orderCount = Data?.totalOrders
        this.orders = Data?.orders
      }
    )

  }

  toggleEdit() {
    this.isProfileEdit = !this.isProfileEdit;
    if (this.isProfileEdit) {
      this.makeEditForm()
    }
  }

  makeEditForm() {
    // edit Profile Form 
    this.editProfileForm = this.formBulilder.group({
      name: [this.userProfile.name, [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
      email: [this.userProfile.email, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      phoneNo: [this.userProfile.phoneNo, [Validators.required, Validators.pattern('^[0-9]{10}$')]],

      Address: this.formBulilder.group({
        name: [this.userAddress.name, [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
        address: [this.userAddress.address, [Validators.required]],
        city: [this.userAddress.city, [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
        state: [this.userAddress.state, [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
        zip: [this.userAddress.zip, [Validators.required, Validators.pattern('^[0-9]{6}$')]]
      })
    })
  }

  get f() {
    return this.editProfileForm.controls
  }

  get f2() {
    return (this.editProfileForm.get('Address') as FormGroup).controls;
  }

  logoutUser() {
    // for confirmation popup
    Swal.fire({
      title: 'Logout',
      text: 'Want to logout from Seabasket?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('userData');
        this.helperService.updateUserData();
        this.router.navigate(['/home'])
      } else {
        return;
      }
    });
  }

  onSubmit() {
    if (this.editProfileForm.invalid) return;

    const { name, email, phoneNo } = this.editProfileForm.value
    const userProfileData = { name, email, phoneNo }

    this.profileService.editUserProfile(userProfileData).subscribe(
      (Data: any) => {
        this.toastr.success(Data.message)
        this.userProfile = Data.profile
        this.isProfileEdit = false;
      })
  }

}
