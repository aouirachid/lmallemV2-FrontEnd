import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-list-service',
  standalone: true,
  imports: [RouterModule,NgFor,NgIf,DataTablesModule],
  templateUrl: './list-service.component.html',
  styleUrl: './list-service.component.css'
})
export class ListServiceComponent implements OnInit{
  Service:any = [];
  dtOptions: Config = {};
  dttrigger:Subject<any> = new Subject<any>();

  constructor(
    private categoryService: CategoryService,
    private serviceService: ServiceService,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.serviceService.getServices().subscribe((data:any) => {
      this.Service = data;
      this.dttrigger.next(null);
    })
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  delete(id: any, i: any) {
    const confirmDelete = confirm("Are you sure you want to delete this Service? This action cannot be undone.");
    if (confirmDelete) {
      this.serviceService.deleteService(id).subscribe(() => {
        this.Service.splice(i, 1);
        this.toastr.error('Service deleted Successfully!', 'Deletion');
      }, (err) => {
        alert("An error occurred while trying to delete the Service.");
        console.log(err);
      });
    } else {
      this.toastr.error('Service deletion canceled', 'Deletion');
    }
  }
}
