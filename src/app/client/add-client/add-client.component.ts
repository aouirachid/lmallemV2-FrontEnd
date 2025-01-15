import { NgFor, NgIf } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../../services/role.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css',
})
export class AddClientComponent implements OnInit {
  clientForm: FormGroup;
  Roles: any = [];

  constructor(
    public formBuilder: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private ngZone: NgZone,
    private roleService: RoleService,
    private toastr: ToastrService
  ) {
    this.clientForm = this.formBuilder.group({
      name: [''],
      phone: [''],
      email: [''],
      city: [''],
      type: [''],
      username: [''],
      password: [''],
      denomination: [''],
      rc: [''],
      ice: [''],
      role: [''],
      status: [''],
    });
  }

  ngOnInit(): void {
    this.roleService.getRoles().subscribe((data: any) => {
      console.log(data);
      this.Roles = data;
    });
    this.clientForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      type: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: [''],
      status: ['', Validators.required],
      denomination: [''],
      rc: [''],
      ice: [''],
    });

    // Listen to changes in the "type" field
    this.clientForm.get('type')?.valueChanges.subscribe((type) => {
      if (type === '4') {
        // If type is "Company", make additional fields required
        this.clientForm.get('denomination')?.setValidators(Validators.required);
        this.clientForm.get('rc')?.setValidators(Validators.required);
        this.clientForm.get('ice')?.setValidators(Validators.required);
      } else {
        // If not "Company", clear validators for additional fields
        this.clientForm.get('denomination')?.clearValidators();
        this.clientForm.get('rc')?.clearValidators();
        this.clientForm.get('ice')?.clearValidators();
      }
      // Update validity status
      this.clientForm.get('denomination')?.updateValueAndValidity();
      this.clientForm.get('rc')?.updateValueAndValidity();
      this.clientForm.get('ice')?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    this.clientService.addClient(this.clientForm.value).subscribe(() => {
      this.toastr.success('Client added Successfully!', 'Success');
      this.ngZone.run(() => this.router.navigateByUrl('/list-client'));
    });
  }
}
