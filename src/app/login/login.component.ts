import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
              protected authService: AuthService) {
      this.loginForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z0-9]+$')
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9].-_+$')
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
    const val = this.loginForm.value;
    this.authService.login(val.username, val.password);
  }

}
