import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone,
    private toastr: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        () => {
          this.toastr.success('Logged in successfully!', 'Success');
          this.ngZone.run(() => this.router.navigateByUrl('/'));
        },
        (error) => {
          this.toastr.error(
            'Login failed. Please check your credentials.',
            'Error'
          );
          console.error('Login error:', error);
        }
      );
    }
  }
}
