import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailOrPhone } from 'src/app/shared/emailOrPhone.validator';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      emailOrPhoneNo: [, [Validators.required, emailOrPhone()]],
      password: [, Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }


  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe((Data) => {

      if (Data !== '') {
        console.log(Data)
        this.router.navigate(['auth/verification'])
      }

    })
  }

}
