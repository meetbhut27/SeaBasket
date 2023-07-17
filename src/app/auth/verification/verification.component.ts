import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/shared/services/helper.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent {

  verificationForm: FormGroup;

  constructor
    (
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private toastr: ToastrService,
      private helperService: HelperService) {

    this.verificationForm = this.formBuilder.group({
      OTP: [, [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });
  }

  get f() {
    return this.verificationForm.controls;
  }

  onSubmit() {
    if (this.verificationForm.invalid) {
      return;
    }

    this.authService.verification(this.verificationForm.value).subscribe((Data: any) => {
      this.toastr.success(Data.message)
      const { userName, authToken } = Data
      localStorage.setItem('userData', JSON.stringify({ userName, authToken }))
      this.helperService.updateUserData();
      this.router.navigate(['/home']);
    })
  }

}
