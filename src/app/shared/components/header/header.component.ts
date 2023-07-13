import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogedIn: boolean = false;
  userName!: string;

  ngOnInit(): void {
    const userData = localStorage.getItem('userData')

    if (userData) {
      this.userName = JSON.parse(userData).userName
      this.isLogedIn = true;
    } else {
      this.isLogedIn = false;
    }

  }



}
