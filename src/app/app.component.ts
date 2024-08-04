import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
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

  toggleSubmenu(menu: string): void {
    this.activeSubmenu = this.activeSubmenu === menu ? '' : menu;
  }
}
