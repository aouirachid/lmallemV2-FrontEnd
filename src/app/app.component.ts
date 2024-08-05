import { NgClass } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lmallem-frontend';
  activeSubmenu: string = '';
  sidebarOpen = false;
  toggleSubmenu(menu: string): void {
    this.activeSubmenu = this.activeSubmenu === menu ? '' : menu;
  }
  
  // @ViewChild('sidebar') sidebarElementRef: ElementRef;

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {  // Checks if sidebar is not null
        if (this.sidebarOpen) {
            sidebar.classList.add('active');
        } else {
            sidebar.classList.remove('active');
        }
    } else {
        console.error('Sidebar element not found!');
    }
}

}
