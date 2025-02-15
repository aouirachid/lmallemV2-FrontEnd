import { Component, NgZone, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HandyManService } from '../../services/handy-man.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-handy-man',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-handy-man.component.html',
  styleUrl: './edit-handy-man.component.css',
})
export class EditHandyManComponent implements OnInit {
  getId: any;
  handyManForm: FormGroup;
  currentselfEmployedCardUrl: string | null = null;
  currentAnthropometricUrl: string | null = null;
  currentdiplomaUrl: string | null = null;
  selectedFiles: { [key: string]: File } = {};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private handyManService: HandyManService,
    private ngZone: NgZone,
    private toastr: ToastrService
  ) {
    this.handyManForm = this.formBuilder.group({
      name: [''],
      phone: [''],
      email: [''],
      city: [''],
      type: [''],
      username: [''],
      password: [''],
      ice: [''],
      specializedField: [''],
      accountNumber: [''],
      bankName: [''],
      selfEmployedCard: [''],
      Anthropometric: [''],
      diploma: [''],
      status: [''],
    });
  }

  ngOnInit(): void {
    this.getId = this.activatedRouter.snapshot.paramMap.get('id');
    this.handyManService.getHandyMan(this.getId).subscribe((response: any) => {
      //console.log(response.documents[0].selfEmployedCard);
      this.handyManForm.patchValue({
        name: response.user.name,
        phone: response.user.phone,
        email: response.user.email,
        city: response.user.city,
        type: response.user.type,
        username: response.user.username,
        ice: response.ice,
        accountNumber: response.accountNumber,
        bankName: response.bankName,
        status: response.status,
      });
      this.currentselfEmployedCardUrl = this.getFullImageUrl(
        response.documents[0].selfEmployedCard
      );
      this.currentAnthropometricUrl = this.getFullImageUrl(
        response.documents[0].Anthropometric
      );
      this.currentdiplomaUrl = this.getFullImageUrl(
        response.documents[0].diploma
      );
    });
  }
  getFullImageUrl(relativePath: string): string {
    return `http://lmallemv2.test/lmallem-backend/public/storage/${relativePath}`;
  }

  onFileSelected(event: any, field: string): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles[field] = file;
    }
  }

  // onUpdate(): void {
  //   console.log('Sending FormData:');

  //   const formData = new FormData();
  //   Object.keys(this.handyManForm.value).forEach((key) => {
  //     console.log(`${key}:`, this.handyManForm.value[key]); // ✅ Log key-values
  //     formData.append(key, this.handyManForm.value[key]);
  //   });

  //   Object.keys(this.selectedFiles).forEach((key) => {
  //     console.log(`File - ${key}:`, this.selectedFiles[key]); // ✅ Log files
  //     formData.append(
  //       key,
  //       this.selectedFiles[key],
  //       this.selectedFiles[key].name
  //     );
  //   });

  //   this.handyManService.updateHandyMan(this.getId, formData).subscribe(
  //     () => {
  //       this.toastr.success('Handy Man updated successfully', 'Success');
  //       this.ngZone.run(() => this.router.navigate(['/list-handy-man']));
  //     },
  //     (error) => {
  //       console.error('Error updating HandyMan:', error);
  //       this.toastr.error('Error updating HandyMan', 'Error');
  //     }
  //   );
  // }

  onUpdate(): void {
    console.log(this.handyManForm.value);
    const formData = new FormData();

    // Append form fields
    Object.keys(this.handyManForm.value).forEach((key) => {
      formData.append(key, this.handyManForm.value[key]);
    });

    // Append file values (if selected)
    Object.keys(this.selectedFiles).forEach((key) => {
      formData.append(
        key,
        this.selectedFiles[key],
        this.selectedFiles[key].name
      );
    });

    // Debug: log all FormData entries
    // for (let pair of (formData as any).entries()) {
    //   console.log(pair[0] + ': ' + pair[1]);
    // }

    this.handyManService.updateHandyMan(this.getId, formData).subscribe(
      () => {
        this.toastr.success('Handy Man updated successfully', 'Success');
        this.ngZone.run(() => this.router.navigate(['/list-handy-man']));
      },
      (error) => {
        console.error('Error updating HandyMan:', error);
        this.toastr.error('Error updating HandyMan', 'Error');
      }
    );
  }
}
