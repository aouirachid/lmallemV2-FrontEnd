import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-category',
  standalone: true,
  imports: [RouterModule,NgFor,NgIf,DataTablesModule],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.css'
})
export class ListCategoryComponent implements OnInit{
  Category:any = [];
  dtOptions: Config = {};
  dttrigger:Subject<any> = new Subject<any>();

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data:any) => {
      this.Category = data;
      this.dttrigger.next(null);
    })
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  delete(id: any, i: any) {
    const confirmDelete = confirm("Are you sure you want to delete this Category? This action cannot be undone.");
    if (confirmDelete) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.Category.splice(i, 1);
        this.toastr.error('Category deleted Successfully!', 'Deletion');
      }, (err) => {
        alert("An error occurred while trying to delete the Category.");
        console.log(err);
      });
    } else {
      this.toastr.error('Category deletion canceled', 'Deletion');
    }
  }
}
