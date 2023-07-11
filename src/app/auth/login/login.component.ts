import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailOrPhone } from 'src/app/shared/emailOrPhone.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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

    console.log(this.loginForm.value);
  }

}
