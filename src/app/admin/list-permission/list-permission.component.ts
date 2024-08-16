import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PermissionService } from '../../services/permission.service';
import { DataTablesModule } from "angular-datatables";
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-permission',
  standalone: true,
  imports: [RouterModule,NgFor,DataTablesModule],
  templateUrl: './list-permission.component.html',
  styleUrl: './list-permission.component.css'
})
export class ListPermissionComponent implements OnInit {

  Permissions:any = [];
  dtOptions: Config = {};
  dttrigger:Subject<any> = new Subject<any>();

  constructor(
    private permissionService: PermissionService,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.permissionService.getPermissions().subscribe((data:any) => {
      this.Permissions = data;
      this.dttrigger.next(null);
    })
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  delete(id: any, i: any) {
    const confirmDelete = confirm("Are you sure you want to delete this permission? This action cannot be undone.");
    if (confirmDelete) {
      this.permissionService.deletePermission(id).subscribe(() => {
        this.Permissions.splice(i, 1);
        this.toastr.error('Permission deleted Successfully!', 'Deletion');
        //alert("Permission deleted successfully.");
      }, (err) => {
        alert("An error occurred while trying to delete the permission.");
        console.log(err);
      });
    } else {
      this.toastr.error('Permission deletion canceled', 'Deletion');
      //alert("Permission deletion canceled.");
    }
  }

}
