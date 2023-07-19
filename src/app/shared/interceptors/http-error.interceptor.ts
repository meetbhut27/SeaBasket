import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HelperService } from '../services/helper.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private helperService: HelperService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        let message: string = ''
        if (error.status == 500 || error.status == 401) {
          message = 'Token is Expired Please Login again.'
          localStorage.clear();
          this.helperService.updateUserData();
          this.router.navigate(['auth/login']);
        }
        else {
          message = error.error.message
        }
        this.toastr.error(message, 'Error')
        return of()
      })
    )
  }
}
