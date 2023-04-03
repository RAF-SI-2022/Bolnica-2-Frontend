import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;

  submitted = false;
  passwordsDontMatch = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private toaster: HotToastService) {
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.resetPasswordForm.get('newPassword')?.value != this.resetPasswordForm.get('confirmPassword')?.value) {
      this.passwordsDontMatch = true;
      return;
    }

    if (this.resetPasswordForm.invalid) {
      return;
    }

    const val = this.resetPasswordForm.value;

    this.authService.resetPassword(this.route.snapshot.paramMap.get('reset-token')!, val.newPassword).subscribe({
      next: (res) => {
        this.router.navigate(['login']).then(() => {
          this.toaster.success(res.message);
        });
      },
      error: (e) => {
        this.toaster.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    })
  }
}
