import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../service/auth.service';

@Injectable({
    providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
    constructor(private router: Router,
                private authService: AuthService,
                private toaster: HotToastService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const token = localStorage.getItem('token');
      if (token === null) {
        return false;
      } else {
        if (this.authService.hasEitherPermission(route.data['permissions'])) {
          return true;
        } else {
          this.toaster.error('Nemate pristup toj stranici.');
          return false;
        }
      }
    }
}
