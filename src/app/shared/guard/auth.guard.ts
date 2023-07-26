import { CanActivateFn, Router } from '@angular/router';
import { HelperService } from '../services/helper.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (
  route,state,
  router:Router=inject(Router),
  toastr:ToastrService=inject(ToastrService),
  helperService:HelperService=inject(HelperService)) => {
  
  let userData
  helperService.getUserData().subscribe((data)=>{
    userData=data
  })

  if(userData){
    return true
  }

  toastr.warning("To access this page, please log in first")
  router.navigate(['auth/login']);
  return false;

};
