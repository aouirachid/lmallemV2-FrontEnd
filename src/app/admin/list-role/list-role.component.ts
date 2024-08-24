import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-list-role',
  standalone: true,
  imports: [RouterModule,NgFor,DataTablesModule],
  templateUrl: './list-role.component.html',
  styleUrl: './list-role.component.css'
})
export class ListRoleComponent implements OnInit{

  Roles:any = [];
  dtOptions: Config = {};
  dttrigger:Subject<any> = new Subject<any>();

  constructor(
    private roleService: RoleService,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.roleService.getRoles().subscribe((data:any) => {
      this.Roles = data;
      this.dttrigger.next(null);
    })
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  delete(id: any, i: any) {
    const confirmDelete = confirm("Are you sure you want to delete this role? This action cannot be undone.");
    if (confirmDelete) {
      this.roleService.deleteRole(id).subscribe(() => {
        this.Roles.splice(i, 1);
        this.toastr.error('Role deleted Successfully!', 'Deletion');
        //alert("Role deleted successfully.");
      }, (err) => {
        alert("An error occurred while trying to delete the role.");
        console.log(err);
      });
    } else {
      this.toastr.error('Role deletion canceled', 'Deletion');
      //alert("Role deletion canceled.");
    }
  }

}
