import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'bolnica2-frontend';

  loginForm: FormGroup;

  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private toaster: HotToastService,
              protected authService: AuthService) {
      this.loginForm = this.formBuilder.group({
      username: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  ngOnInit(): void {

  }

  get registerLoginControl() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const val = this.loginForm.value;
    this.authService.login(val.username, val.password).subscribe({
      next: (res) => {
        this.authService.setSession(res.token);
      },
      error: (e) => {
        if (e.status == 401) {
            this.toaster.error(e.error.errorMessage);
        }
      }
    })
  }

}
