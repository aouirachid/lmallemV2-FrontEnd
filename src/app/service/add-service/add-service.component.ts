import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ServiceService } from '../../services/service.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Category } from '../../Models/Category';

@Component({
  selector: 'app-add-service',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.css'
})
export class AddServiceComponent implements OnInit{
  serviceForm: FormGroup;
  categories: any[] = [];
  selectedFile: File | null = null;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private categoryService: CategoryService,
    private serviceService: ServiceService,
    private ngZone: NgZone,
    private toastr: ToastrService
  ) {
    this.serviceForm = this.formBuilder.group({
      name: [''],
      image: [''],
      description: [''],
      category_id: [''],
      status: [''],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: any) => {
        console.log('Categories loaded:', data);
        this.categories = Array.isArray(data) ? data : [];
        if (!Array.isArray(data)) {
          console.warn('Received data is not an array:', data);
        }
      },
      error: (error: any) => {
        console.error('Error loading categories:', error);
        this.toastr.error('Failed to load categories', 'Error');
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
      const formData = new FormData();
      Object.keys(this.serviceForm.value).forEach(key => {
        formData.append(key, this.serviceForm.value[key]);
      });
      
      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }

      this.serviceService.addService(formData).subscribe({
        next: () => {
          this.toastr.success('Service Added Successfully', 'Success');
          this.ngZone.run(() => { this.router.navigateByUrl('/list-service') });
        },
        error: (error: any) => {
          console.error('Error adding service:', error);
          this.toastr.error('Failed to add service', 'Error');
        }
      });
    } else {
      this.toastr.warning('Please fill all required fields', 'Warning');
    }
  }

}
