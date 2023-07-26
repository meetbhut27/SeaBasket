import { Component } from '@angular/core';
import { HelperService } from './shared/services/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLoading:boolean = false

  constructor(
    private helperService: HelperService
  ){
    this.helperService.getLoaderStatus().subscribe((status)=>{
      this.isLoading = status
    })
  }
}
