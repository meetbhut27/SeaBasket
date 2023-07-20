import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLogedIn: boolean = false;
  userName!: string;
  userSubscription!: Subscription;

  constructor(private helperService: HelperService,public router:Router) { }

  ngOnInit(): void {
    this.helperService.updateUserData();
    this.userSubscription = this.helperService.getUserData().subscribe((Data: any) => {
      this.userName = Data;
      if (this.userName) {
        this.isLogedIn = true;
      } else {
        this.isLogedIn = false;
      }
    })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
