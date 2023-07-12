import { query } from '@angular/animations';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError, map } from 'rxjs';

import { forgetPasswordAPI, loginAPI, resetPasswordAPI, verificationAPI } from 'src/app/shared/APIs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  verificationtoken!: string

  // for login API
  login(userData: FormData) {
    return this.http.post(loginAPI, userData).pipe(
      catchError((error) => {
        this.commonErrorHandler(error)
        return '';
      }),
      map((res: any) => {
        this.verificationtoken = res.verificationtoken
        return res;
      })
    )
  }

  // for OTP verification API
  verification(otpObject: FormData) {
    return this.http.post(verificationAPI + this.verificationtoken, otpObject).pipe(
      catchError((error) => {
        this.commonErrorHandler(error)
        return '';
      }),
      map((res) => {
        return res;
      })
    )
  }

  // for forget-password email API
  forgotPassword(emailObject: FormData) {
    return this.http.post(forgetPasswordAPI, emailObject).pipe(
      catchError((error) => {
        this.commonErrorHandler(error)
        return '';
      }),
      map((res) => {
        return res;
      })
    )
  }

  // for reset-password API
  resetPassword(passwordObject: object, token: string) {
    return this.http.post(resetPasswordAPI + token, passwordObject).pipe(
      catchError((error) => {
        this.commonErrorHandler(error)
        return '';
      }),
      map((res) => {
        return res;
      })
    )
  }

  // for handling errors
  commonErrorHandler(error: any) {
    alert(error.error.message)
  }

}
