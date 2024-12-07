import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone,
    private toastr: ToastrService
  ) {
    this.registerForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;
      this.authService.register(name, email, password).subscribe(
        () => {
          this.toastr.success('Registered successfully!', 'Success');
          this.ngZone.run(() => this.router.navigateByUrl('/dashboard'));
        },
        (error) => {
          this.toastr.error('Registration failed. Please try again.', 'Error');
          console.error('Registration error:', error);
        }
      );
    }
  }
}
