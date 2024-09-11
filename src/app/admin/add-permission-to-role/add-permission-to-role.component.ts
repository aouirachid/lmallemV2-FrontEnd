import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { ToastrService } from 'ngx-toastr';
import { PermissionService } from '../../services/permission.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Permission, Role } from '../../Models/Role';

@Component({
  selector: 'app-add-permission-to-role',
  standalone: true,
  imports: [NgFor,ReactiveFormsModule,NgIf,CommonModule],
  templateUrl: './add-permission-to-role.component.html',
  styleUrl: './add-permission-to-role.component.css'
})
export class AddPermissionToRoleComponent implements OnInit{
  getId: any;
  role: Role | null = null;
  allPermissions: Permission[] = [];
  // roleName: string = '';
  // Permissions: any[] = [];
  // rolePermissions: any[] = [];  // Array to hold the existing permissions of the role
  updateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {
    this.getId = 0;
    this.updateForm = this.formBuilder.group({
      permissions: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.getId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.roleService.getRole(this.getId).subscribe(
      (role: Role) => {
        this.role = role;
        this.loadPermissions();
      },
      (err) => {
        console.log('Error fetching role data:', err);
        this.toastr.error('Failed to fetch role data');
      }
    );
  }

  loadPermissions(): void {
    this.permissionService.getPermissions().subscribe(
      (permissions: any) => {
        this.allPermissions = permissions;
        this.addCheckboxes();
        this.cdr.detectChanges();
      },
      (err) => {
        console.log('Error fetching permissions:', err);
        this.toastr.error('Failed to fetch permissions');
      }
    );
  }


  private addCheckboxes(): void {
    this.allPermissions.forEach((permission) => {
      const isChecked = this.role?.permissions?.some(p => p.id === permission.id) || false;
      this.permissionsFormArray.push(new FormControl(isChecked));
    });
  }

  get permissionsFormArray(): FormArray {
    return this.updateForm.get('permissions') as FormArray;
  }

  onUpdate(): void {
    if (!this.role) {
      this.toastr.error('No role selected');
      return;
    }

    const selectedPermissions = this.updateForm.value.permissions
      .map((checked: boolean, i: number) => checked ? this.allPermissions[i].id : null)
      .filter((v: any) => v !== null);

    if (selectedPermissions.length === 0) {
      this.toastr.warning('Please select at least one permission', 'Warning');
      return;
    }

    this.roleService.addPermissionToRole(this.role.id, selectedPermissions).subscribe(
      (res) => {
        this.toastr.success('Permissions updated successfully', 'Success');
        this.router.navigateByUrl('/list-role');
      },
      (err) => {
        this.toastr.error('Failed to update permissions');
        console.error('Error updating permissions:', err);
      }
    );
  }
}
