import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent {

  verificationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
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

      if (Data !== '') {
        console.log(Data);
        localStorage.setItem('authToken', Data.authToken)
      }
      // this.router.navigate(['/home']);
    })

  }

}
