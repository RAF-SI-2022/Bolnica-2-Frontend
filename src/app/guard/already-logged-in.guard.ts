import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AlreadyLoggedInGuard implements CanActivate {
  constructor(private router: Router,
    private authService: AuthService) { };
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      console.log('yo');
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
