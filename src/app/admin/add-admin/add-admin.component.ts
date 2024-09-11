import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminPanelService } from '../../services/admin-panel.service';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../../services/role.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css'
})
export class AddAdminComponent implements OnInit{
  Roles:any = [];
  adminPanelForm : FormGroup;
  selectedFile: File | null = null;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private adminPanelService: AdminPanelService,
    private roleService: RoleService,
    private ngZone: NgZone,
    private toastr: ToastrService
  ){
    this.adminPanelForm = this.formBuilder.group({
      name:[''],
      phone:[''],
      email:[''],
      city:[''],
      type:[''],
      image:[''],
      username:[''],
      password:[''],
      role:[''],
      status:['']
    });
  }

  ngOnInit(): void {
    this.roleService.getRoles().subscribe((data:any) => {
      //console.log(data);
      this.Roles = data;
    })
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  onSubmit(): void {
    console.log(this.adminPanelForm.value);
    
    if (this.adminPanelForm.valid) {
      const formData = new FormData();
      Object.keys(this.adminPanelForm.value).forEach(key => {
        formData.append(key, this.adminPanelForm.value[key]);
      });
      
      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }

      this.adminPanelService.addAdminPanel(formData).subscribe({
        next: () => {
          this.toastr.success('Admin Added Successfully', 'Success');
          this.ngZone.run(() => { this.router.navigateByUrl('/list-admin') });
        },
        error: (error: any) => {
          console.error('Error adding admin:', error);
          this.toastr.error('Failed to add admin', 'Error');
        }
      });
    } else {
      this.toastr.warning('Please fill all required fields', 'Warning');
    }
  }

}
