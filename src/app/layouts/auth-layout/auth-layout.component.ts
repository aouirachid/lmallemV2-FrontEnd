import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {}
