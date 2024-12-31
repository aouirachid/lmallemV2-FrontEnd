import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgClass, NgbModule, NgIf],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent implements OnInit {
  username: string = '';
  role: string = '';
  activeSubmenu: string = '';
  sidebarOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue;
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    if (currentUser) {
      this.username = currentUser.name;
      this.role = roles;
    }
  }

  //for submenu
  toggleSubmenu(menu: string): void {
    this.activeSubmenu = this.activeSubmenu === menu ? '' : menu;
  }

  //for sidebar
  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    const sidebar = document.getElementById('sidebar') as HTMLElement;
    const main = document.querySelector('main') as HTMLElement;
    if (sidebar) {
      sidebar.classList.toggle('active');
      main.classList.toggle('active'); // Adjust main content too
    }
  }

  //hide unauth
  isAdmin(): boolean {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    return roles.includes('Administrator');
  }

  logout(): void {
    this.authService.logout().subscribe(
      () => {
        this.router.navigate(['/login']); // Redirect to login page
        this.toastr.success('You have been logged out successfully', 'Logout');
      },
      (error) => {
        console.error('Logout failed', error);
      }
    );
  }
}
