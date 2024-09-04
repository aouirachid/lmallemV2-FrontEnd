import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { CategoryService } from '../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-service',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-service.component.html',
  styleUrl: './edit-service.component.css'
})
export class EditServiceComponent implements OnInit {
  getId: any;
  updateForm: FormGroup;
  categories: any[] = [];
  selectedFile: File | null = null;
  currentImageUrl: string | null = null;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private serviceService: ServiceService,
    private categoryService: CategoryService,
    private ngZone: NgZone,
    private toastr: ToastrService
  ) {
    this.updateForm = this.formBuilder.group({
      name: [''],
      description: [''],
      category_id: [''],
      status: [''],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.serviceService.getService(this.getId).subscribe(
      (res) => {
        this.updateForm.patchValue({
          name: res.name,
          description: res.description,
          category_id: res.category_id,
          status: res.status,
        });
        // Construct the full URL for the image
        this.currentImageUrl = this.getFullImageUrl(res.image);
      },
      (err) => {
        console.error('Error fetching service data:', err);
        this.toastr.error('Failed to load service data', 'Error');
      }
    );
  }

  getFullImageUrl(relativePath: string): string {
    return `http://lmallemv2.test/lmallem-backend/public/storage/${relativePath}`;
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: any) => {
        this.categories = Array.isArray(data) ? data : [];
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

  onUpdate(): void {
    const formData = new FormData();
    
    // Append form fields
    Object.keys(this.updateForm.value).forEach(key => {
      formData.append(key, this.updateForm.value[key]);
    });

    // Append file if selected
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.serviceService.updateService(this.getId, formData).subscribe(
      () => {
        this.toastr.success('Service Updated Successfully!', 'Success');
        this.ngZone.run(() => this.router.navigateByUrl('/list-service'));
      },
      (err) => {
        console.error('Error updating service:', err);
        this.toastr.error('Failed to update service', 'Error');
      }
    );
  }
}