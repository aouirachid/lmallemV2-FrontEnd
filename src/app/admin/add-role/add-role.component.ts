import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-role',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent implements OnInit{

  roleForm : FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private roleService: RoleService,
    private ngZone: NgZone,
    private toastr: ToastrService
  ){
    this.roleForm = this.formBuilder.group({
      name:['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): any {
    this.roleService.addRole(this.roleForm.value).subscribe(() => {
      //console.log('Role added Successfully!');
      this.toastr.success('Role added Successfully!', 'Success');
      this.ngZone.run(() => this.router.navigateByUrl('/list-role'));
    });
  }
}
