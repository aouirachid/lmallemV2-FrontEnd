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
  imports: [NgFor, ReactiveFormsModule, NgIf, CommonModule],
  templateUrl: './add-permission-to-role.component.html',
  styleUrl: './add-permission-to-role.component.css',
})
export class AddPermissionToRoleComponent implements OnInit {
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
      permissions: new FormArray([]),
    });
  }

  ngOnInit(): void {
    this.getId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    // Fetch role with its permissions
    this.roleService.getRolesWithPermissions().subscribe({
      next: (roles) => {
        const role = roles.find((r: Role) => r.id === this.getId);

        if (role) {
          this.role = role;
          this.populateForm(role.permissions);
        } else {
          this.toastr.error('Role not found!');
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to fetch roles!');
      },
    });
    this.loadPermissions();
  }

  // Populate FormArray with the role's existing permissions
  populateForm(rolePermissions: Permission[]) {
    const formArray = this.updateForm.get('permissions') as FormArray;
    formArray.clear();
    this.allPermissions.forEach((permission) => {
      const isAssigned = rolePermissions.some((rp) => rp.id === permission.id);
      formArray.push(new FormControl(isAssigned));
    });
  }

  // Add FormArray controls for all permissions
  addFormControls() {
    const formArray = this.updateForm.get('permissions') as FormArray;
    this.allPermissions.forEach(() => {
      formArray.push(new FormControl(false));
    });
  }

  loadPermissions(): void {
    this.permissionService.getPermissions().subscribe(
      (permissions: any) => {
        // Uses 'any' to bypass type issues
        this.allPermissions = permissions as Permission[]; // Local type assertion
        this.addCheckboxes();
        this.cdr.detectChanges();
      },
      (err) => {
        console.error('Error fetching permissions:', err);
        this.toastr.error('Failed to fetch permissions');
      }
    );
  }

  private addCheckboxes(): void {
    this.allPermissions.forEach((permission) => {
      const isChecked =
        this.role?.permissions?.some((p) => p.id === permission.id) || false;
      this.permissionsFormArray.push(new FormControl(isChecked));
    });
  }

  get permissionsFormArray(): FormArray {
    return this.updateForm.get('permissions') as FormArray;
  }

  onUpdate(): void {
    const selectedPermissions = this.updateForm.value.permissions
      .map((checked: boolean, index: number) =>
        checked ? this.allPermissions[index].id : null
      )
      .filter((id: number | null) => id !== null);

    if (selectedPermissions.length === 0) {
      this.toastr.warning('Please select at least one permission', 'Warning');
      return;
    }

    this.roleService
      .addPermissionToRole(this.getId, selectedPermissions)
      .subscribe({
        next: () => {
          this.toastr.success('Permissions updated successfully!');
          this.router.navigateByUrl('/list-role');
        },
        error: (err) => {
          console.error('Error updating permissions:', err);
          this.toastr.error('Failed to update permissions!');
        },
      });
  }
}
