import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PermissionService } from '../../services/permission.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-permission',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-permission.component.html',
  styleUrl: './add-permission.component.css'
})
export class AddPermissionComponent implements OnInit {
  permissionForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private permissionService: PermissionService,
    private ngZone: NgZone,
    private toastr: ToastrService
  ){
    this.permissionForm = this.formBuilder.group({
      name:['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): any {
    this.permissionService.addPermission(this.permissionForm.value).subscribe(() => {
      //console.log('Permission added Successfully!');
      this.toastr.success('Permission added Successfully!', 'Success');
      this.ngZone.run(() => this.router.navigateByUrl('/list-permission'));
    });
  }
  
}
