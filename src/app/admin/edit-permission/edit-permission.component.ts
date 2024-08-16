import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionService } from '../../services/permission.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-permission',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-permission.component.html',
  styleUrl: './edit-permission.component.css'
})
export class EditPermissionComponent implements OnInit {
  getId:any;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
      private router : Router,
      private activatedRouter : ActivatedRoute,
      private permissionService: PermissionService,
      private ngZone: NgZone,
      private toastr: ToastrService
  ){
    this.updateForm = this.formBuilder.group({
      name:[''],
      })
  }

  ngOnInit(): void {
    this.getId = this.activatedRouter.snapshot.paramMap.get('id');
    this.permissionService.getPermission(this.getId).subscribe(res => {
      //console.log('Received permission data:', res);
      this.updateForm.setValue({
        name: res.name,
      });
    }, err => {
      console.log('Error fetching permission data:', err);
    });
  }

  onUpdate():any{
    this.permissionService.updatePermission(this.getId,this.updateForm.value).subscribe(() =>{
      //console.log('permission updated Successfully!')
      this.toastr.success('Permission Updated Successfully!', 'Success');
      this.ngZone.run(() => this.router.navigateByUrl('/list-permission'))
    },(err)=>{
      console.log(err)
    })
  }

}
