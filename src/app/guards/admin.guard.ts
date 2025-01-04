import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]'); // Get roles from localStorage
    const requiredRoles = ['Manager', 'Administrator']; // Roles allowed access

    if (requiredRoles.some((role) => roles.includes(role))) {
      return true; // Allow access if the user has any of the required roles
    }

    // Redirect to unauthorized or home page if not an Administrator
    this.router.navigate(['/unauthorized'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
