import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminPanelService } from '../../services/admin-panel.service';
import { ToastrService } from 'ngx-toastr';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-edit-admin',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor],
  templateUrl: './edit-admin.component.html',
  styleUrl: './edit-admin.component.css'
})
export class EditAdminComponent implements OnInit{
  getId:any;
  updateForm: FormGroup;
  Roles: any[] = [];

  constructor(
    public formBuilder: FormBuilder,
      private router : Router,
      private activatedRouter : ActivatedRoute,
      private adminPanelService: AdminPanelService,
      private ngZone: NgZone,
      private toastr: ToastrService
  ){
    this.updateForm = this.formBuilder.group({
      name: [''],
      phone: [''],
      email: [''],
      city: [''],
      type: [''],
      username: [''],
      password: [''],
      status: [''],
      role: ['']
      })
  }

  ngOnInit(): void {
    this.getId = this.activatedRouter.snapshot.paramMap.get('id');
    this.adminPanelService.getAdminPanel(this.getId).subscribe(
      (res: any) => {
        console.log('Received admin data:', res);
        this.updateForm.patchValue({
          name: res.adminPanel.user.name,
          phone: res.adminPanel.user.phone,
          email: res.adminPanel.user.email,
          city: res.adminPanel.user.city,
          type: res.adminPanel.user.type,
          username: res.adminPanel.user.username,
          password: '',
          status: res.adminPanel.status,
          role: res.adminPanel.user.roles[0]?.id // Assuming user has only one role
        });
        this.Roles = res.allRoles;
      },
      err => {
        console.log('Error fetching admin data:', err);
      }
    );
  }
  
  

  onUpdate():any{
    this.adminPanelService.updateAdminPanel(this.getId,this.updateForm.value).subscribe(() =>{
      //console.log('Admin updated Successfully!')
      this.toastr.success('Admin Updated Successfully!', 'Success');
      this.ngZone.run(() => this.router.navigateByUrl('/list-admin'))
    },(err)=>{
      console.log(err)
    })
  }
}
