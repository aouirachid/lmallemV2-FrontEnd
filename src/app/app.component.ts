import { NgClass } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgClass,NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lmallem-frontend';
  activeSubmenu: string = '';
  sidebarOpen = false;

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

  
}