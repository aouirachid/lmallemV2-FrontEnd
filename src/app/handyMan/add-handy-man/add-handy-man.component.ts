import { NgFor } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HandyManService } from '../../services/handy-man.service';

@Component({
  selector: 'app-add-handy-man',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-handy-man.component.html',
  styleUrl: './add-handy-man.component.css',
})
export class AddHandyManComponent implements OnInit {
  handyManForm: FormGroup;
  selectedFiles: { [key: string]: File } = {};
  constructor(
    private formBuilder: FormBuilder,
    private handyMan: HandyManService,
    private router: Router,
    private ngZone: NgZone,
    private toastr: ToastrService
  ) {
    this.handyManForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      type: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      ice: ['', Validators.required],
      specializedField: ['', Validators.required],
      accountNumber: ['', Validators.required],
      bankName: ['', Validators.required],
      selfEmployedCard: ['', Validators.required],
      Anthropometric: ['', Validators.required],
      diploma: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.handyManForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      type: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      ice: ['', Validators.required],
      specializedField: ['', Validators.required],
      accountNumber: ['', Validators.required],
      bankName: ['', Validators.required],
      // selfEmployedCard: ['', Validators.required],
      // Anthropometric: ['', Validators.required],
      // diploma: ['', Validators.required],
      status: ['', Validators.required],
    });
  }
  onFileSelected(event: any, field: string): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles[field] = file;
    }
  }

  onSubmit(): void {
    console.log(this.handyManForm.value);
    if (this.handyManForm.valid) {
      const formData = new FormData();

      // Append form values
      Object.keys(this.handyManForm.value).forEach((key) => {
        if (this.handyManForm.value[key]) {
          formData.append(key, this.handyManForm.value[key]);
        }
      });

      // Append all selected files
      Object.keys(this.selectedFiles).forEach((key) => {
        formData.append(
          key,
          this.selectedFiles[key],
          this.selectedFiles[key].name
        );
      });

      this.handyMan.addHandyMan(formData).subscribe({
        next: () => {
          this.toastr.success('Handy Man Added Successfully', 'Success'); // Fixed message
          this.ngZone.run(() => {
            this.router.navigateByUrl('/list-handy-man');
          });
        },
        error: (error: any) => {
          console.error('Error adding Handy Man:', error);
          this.toastr.error('Failed to add Handy Man', 'Error');
        },
      });
    } else {
      this.toastr.warning('Please fill all required fields', 'Warning');
    }
  }
}
