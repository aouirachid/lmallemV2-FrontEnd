
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit{
  categoryForm : FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private categoryService: CategoryService,
    private ngZone: NgZone,
    private toastr: ToastrService
  ){
    this.categoryForm = this.formBuilder.group({
      name:[''],
      estimatedPrice:[''],
      status:[''],
    });
  }
  ngOnInit(): void {}

  onSubmit(): any {
    // console.log("the value of the form is:"+this.categoryForm.value);
    this.categoryService.addCategory(this.categoryForm.value).subscribe(() => {
      this.toastr.success('Category added Successfully!', 'Success');
      this.ngZone.run(() => this.router.navigateByUrl('/list-category'));
    });
  }

}
