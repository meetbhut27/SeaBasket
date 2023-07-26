import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { forgetPasswordAPI, loginAPI, resetPasswordAPI, verificationAPI } from 'src/app/shared/APIs';
import { HelperService } from 'src/app/shared/services/helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private helperService: HelperService
  ) { }

  verificationtoken!: string

  // for login API
  login(userData: FormData) {
    this.helperService.startLoading()
    return this.http.post(loginAPI, userData).pipe(
      map((res: any) => {
        this.verificationtoken = res.verificationtoken
        this.helperService.stoploading()
        return res;
      })
    )
  }

  // for OTP verification API
  verification(otpObject: FormData) {
    this.helperService.startLoading()
    return this.http.post(verificationAPI + this.verificationtoken, otpObject).pipe(
      map((res) => {
        this.helperService.stoploading()
        return res;
      })
    )
  }

  // for forget-password email API
  forgotPassword(emailObject: FormData) {
    this.helperService.startLoading()
    return this.http.post(forgetPasswordAPI, emailObject).pipe(
      map((res) => {
        this.helperService.stoploading()
        return res;
      })
    )
  }

  // for reset-password API
  resetPassword(passwordObject: object, token: string) {
    this.helperService.startLoading()
    return this.http.post(resetPasswordAPI + token, passwordObject).pipe(
      map((res) => {
        this.helperService.stoploading()
        return res;
      })
    )
  }

}
