import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { ToastrService } from 'ngx-toastr';
import { PermissionService } from '../../services/permission.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-permission-to-role',
  standalone: true,
  imports: [NgFor,ReactiveFormsModule,NgIf,CommonModule],
  templateUrl: './add-permission-to-role.component.html',
  styleUrl: './add-permission-to-role.component.css'
})
export class AddPermissionToRoleComponent implements OnInit{
  getId: any;
  roleName: string = '';
  Permissions: any[] = [];
  rolePermissions: any[] = [];  // Array to hold the existing permissions of the role
  updateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {
    this.updateForm = this.formBuilder.group({
      permissions: new FormArray([])  // Create a form array for the permissions
    });
  }

  ngOnInit(): void {
    this.getId = this.activatedRouter.snapshot.paramMap.get('id');

    this.roleService.getRole(this.getId).subscribe(res => {
      this.roleName = res.name;
      // this.rolePermissions = res.permissions.map(p => p.id); // Assuming res.permissions is an array of permission objects with an id
    }, err => {
      console.log('Error fetching role data:', err);
    });

    this.permissionService.getPermissions().subscribe((data: any) => {
      console.log('Permissions received:', data);
      this.Permissions = data;
      // this.addCheckboxes(); 
      // this.cdr.detectChanges();  Manually trigger change detection after adding checkboxes
    });
  }

  private addCheckboxes() {
    this.Permissions.forEach((permission, index) => {
      const isChecked = this.rolePermissions.includes(permission.id); // Check if the permission is already assigned
      this.permissionsFormArray.push(new FormControl(isChecked));
      console.log(`Control added for permission: ${permission.name}, Checked: ${isChecked}, Index: ${index}`);
    });
  }

  get permissionsFormArray() {
    return this.updateForm.controls['permissions'] as FormArray;
  }

  onUpdate(): void {
    console.log(this.updateForm.value); // Check the form data
    const selectedPermissions = this.updateForm.value.permissions
      .map((checked: boolean, i: number) => checked ? this.Permissions[i].id : null)
      .filter((v: any) => v !== null);
    if (selectedPermissions.length === 0) {
      this.toastr.warning('Please select at least one permission', 'Warning');
      return;
    }
  
    this.roleService.addPermissionToRole(this.getId, selectedPermissions).subscribe(
      res => {
        this.toastr.success('Permissions updated successfully', 'Success');
        this.ngZone.run(() => this.router.navigateByUrl('/list-role'));
      },
      err => {
        this.toastr.error('Failed to update permissions');
        console.error('Error updating permissions:', err);
      }
    );
  }
}
