import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const userData = localStorage.getItem("userData");
    if (userData) {
      const token = JSON.parse(userData).authToken;
      const newRequest = request.clone(
        { headers: request.headers.set('Authorization', "Bearer " + token) }
      )
      return next.handle(newRequest)
    }

    return next.handle(request)
  }
}
