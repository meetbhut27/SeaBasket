import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { orderAPI, profileAPI } from 'src/app/shared/APIs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getUserProfile() {
    return this.http.get(profileAPI).pipe(
      map((res) => {
        return res;
      })
    )
  }

  editUserProfile(userProfileData: any) {
    return this.http.put(profileAPI, userProfileData).pipe(
      map((res) => {
        return res;
      })
    )
  }

  getOrders() {
    return this.http.get(orderAPI).pipe(
      map((res) => {
        return res;
      })
    )
  }

}
