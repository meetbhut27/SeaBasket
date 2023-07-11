import { query } from '@angular/animations';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError, map } from 'rxjs';

import { loginAPI, verificationAPI } from 'src/app/shared/APIs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  verificationtoken!: string

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

  commonErrorHandler(error: any) {
    console.log()
    alert(error.error.message)
  }

}
