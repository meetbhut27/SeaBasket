import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { orderAPI, profileAPI } from 'src/app/shared/APIs';
import { HelperService } from 'src/app/shared/services/helper.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
    private helperService: HelperService
  ) { }

  getUserProfile() {
    this.helperService.startLoading()
    return this.http.get(profileAPI).pipe(
      map((res) => {
        this.helperService.stoploading()
        return res;
      })
    )
  }

  editUserProfile(userProfileData: any) {
    this.helperService.startLoading()
    return this.http.put(profileAPI, userProfileData).pipe(
      map((res) => {
        this.helperService.stoploading()
        return res;
      })
    )
  }

  getOrders() {
    this.helperService.startLoading()
    return this.http.get(orderAPI).pipe(
      map((res) => {
        this.helperService.stoploading()
        return res;
      })
    )
  }

}
