import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {


  forgotPassForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.forgotPassForm = this.formBuilder.group({
      email: [, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
    });
  }

  get f() {
    return this.forgotPassForm.controls;
  }


  onSubmit() {
    if (this.forgotPassForm.invalid) {
      return;
    }

    this.authService.forgotPassword(this.forgotPassForm.value).subscribe((Data: any) => {

      if (Data !== '') {
        console.log(Data)
        alert(Data.message)
      }

    })
  }

}
