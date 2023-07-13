import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { passwordMatchValidator } from 'src/app/shared/validators/passwordMatch.validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  token!: string;
  resetPasswordFrom: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) {

    this.resetPasswordFrom = this.formBuilder.group({
      newPassword: [, [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{6,}$')]],
      confirmPassword: [, [Validators.required]]
    },
      {
        validator: passwordMatchValidator(),
      });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.token = params.token
    })
  }

  get f() {
    return this.resetPasswordFrom.controls;
  }


  onSubmit() {
    if (this.resetPasswordFrom.invalid) {
      return;
    }

    const passwordObj: object = { 'newPassword': this.resetPasswordFrom.value.newPassword }

    this.authService.resetPassword(passwordObj, this.token).subscribe((Data) => {
      this.toastr.success('Password Changed successfully,please login again')
      this.router.navigate(['auth/login'])
    })
  }


}
