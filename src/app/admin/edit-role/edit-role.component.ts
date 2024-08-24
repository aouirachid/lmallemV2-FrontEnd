import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-role',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.css'
})
export class EditRoleComponent implements OnInit{

  getId:any;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
      private router : Router,
      private activatedRouter : ActivatedRoute,
      private roleService: RoleService,
      private ngZone: NgZone,
      private toastr: ToastrService
  ){
    this.updateForm = this.formBuilder.group({
      name:[''],
      })
  }

  ngOnInit(): void {
    this.getId = this.activatedRouter.snapshot.paramMap.get('id');
    this.roleService.getRole(this.getId).subscribe(res => {
      //console.log('Received role data:', res);
      this.updateForm.setValue({
        name: res.name,
      });
    }, err => {
      console.log('Error fetching role data:', err);
    });
  }

  onUpdate():any{
    this.roleService.updateRole(this.getId,this.updateForm.value).subscribe(() =>{
      //console.log('role updated Successfully!')
      this.toastr.success('Role Updated Successfully!', 'Success');
      this.ngZone.run(() => this.router.navigateByUrl('/list-role'))
    },(err)=>{
      console.log(err)
    })
  }

}
