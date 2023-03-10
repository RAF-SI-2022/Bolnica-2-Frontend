import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bolnica2-frontend';

  constructor(protected authService: AuthService,
              private router: Router) {
  }

  isOnHomePage(): boolean {
    return this.router.url === '/';
  }
}
