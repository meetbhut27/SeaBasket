import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }
  private userSubject = new BehaviorSubject<any>(null);

  getUserData() {
    return this.userSubject.asObservable();
  }

  updateUserData() {
    let user = localStorage.getItem('userData');
    if (user) {
      const newUser = JSON.parse(user).userName
      this.userSubject.next(newUser);
    }
    else {
      this.userSubject.next(null);
    }
  }

}