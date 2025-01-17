import { Component, NgZone, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { ToastrService } from 'ngx-toastr';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.css',
})
export class EditClientComponent implements OnInit {
  getId: any;
  clientForm: FormGroup;
  Roles: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private clinetService: ClientService,
    private ngZone: NgZone,
    private toastr: ToastrService
  ) {
    this.clientForm = this.formBuilder.group({
      name: [''],
      phone: [''],
      email: [''],
      city: [''],
      type: [''],
      username: [''],
      password: [''],
      denomination: [''],
      rc: [''],
      ice: [''],
      role: [''],
      status: [''],
    });
  }

  ngOnInit(): void {
    this.getId = this.activatedRouter.snapshot.paramMap.get('id');
    this.clinetService.getClient(this.getId).subscribe(
      (res: any) => {
        // console.log(res);
        // console.log(res.allRoles);

        this.clientForm.patchValue({
          name: res.client.user.name,
          phone: res.client.user.phone,
          email: res.client.user.email,
          city: res.client.user.city,
          type: res.client.user.type,
          username: res.client.user.username,
          password: res.client.user.password,
          denomination: res.client.denomination,
          rc: res.client.rc,
          ice: res.client.ice,
          role: res.client.user.roles[0]?.id,
          status: res.client.status,
        });
        this.Roles = res.allRoles;
      },
      (err) => {
        console.log('Error fetching client data:', err);
        this.toastr.error('Failed to get client data', 'Error');
      }
    );
    // Listen to changes in the "type" field
    // this.clientForm.get('type')?.valueChanges.subscribe((type) => {
    //   if (type === '4') {
    //     // If type is "Company", make additional fields required
    //     this.clientForm.get('denomination')?.setValidators(Validators.required);
    //     this.clientForm.get('rc')?.setValidators(Validators.required);
    //     this.clientForm.get('ice')?.setValidators(Validators.required);
    //   } else {
    //     // If not "Company", clear validators for additional fields
    //     this.clientForm.get('denomination')?.clearValidators();
    //     this.clientForm.get('rc')?.clearValidators();
    //     this.clientForm.get('ice')?.clearValidators();
    //   }
    //   // Update validity status
    //   this.clientForm.get('denomination')?.updateValueAndValidity();
    //   this.clientForm.get('rc')?.updateValueAndValidity();
    //   this.clientForm.get('ice')?.updateValueAndValidity();
    // });
  }

  onUpdate(): any {
    this.clinetService
      .updateClient(this.getId, this.clientForm.value)
      .subscribe(
        () => {
          //console.log('Admin updated Successfully!')
          this.toastr.success('Client Updated Successfully!', 'Success');
          this.ngZone.run(() => this.router.navigateByUrl('/list-client'));
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
