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

    if (roles.includes(['Manager'])) {
      return true; // Allow access
    }

    // Redirect to unauthorized or home page if not an Administrator
    this.router.navigate(['/unauthorized'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
