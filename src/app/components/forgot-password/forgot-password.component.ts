import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;

  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private toaster: HotToastService) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.forgotPasswordForm.invalid) {
      return;
    }

    const val = this.forgotPasswordForm.value;
    this.authService.forgotPassword(val.email).subscribe({
      next: (res) => {
        this.toaster.success(res.message);
      },
      error: (e) => {
        this.toaster.error(e.error.errorMessage || 'Greška. Server se ne odaziva');
      }
    });
  }
}
