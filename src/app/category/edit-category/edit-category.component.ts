import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit{
  getId:any;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
      private router : Router,
      private activatedRouter : ActivatedRoute,
      private categoryService: CategoryService,
      private ngZone: NgZone,
      private toastr: ToastrService
  ){
    this.updateForm = this.formBuilder.group({
      name:[''],
      estimatedPrice:[''],
      status:[''],
      })
  }

  ngOnInit(): void {
    this.getId = this.activatedRouter.snapshot.paramMap.get('id');
    this.categoryService.getCategory(this.getId).subscribe(res => {
      //console.log('Received category data:', res);
      this.updateForm.setValue({
        name: res.name,
        estimatedPrice : res.estimatedPrice,
        status : res.status,
      });
    }, err => {
      console.log('Error fetching category data:', err);
    });
  }

  onUpdate():any{
    this.categoryService.updateCategory(this.getId,this.updateForm.value).subscribe(() =>{
      //console.log('Category updated Successfully!')
      this.toastr.success('Category Updated Successfully!', 'Success');
      this.ngZone.run(() => this.router.navigateByUrl('/list-category'))
    },(err)=>{
      console.log(err)
    })
  }
}
