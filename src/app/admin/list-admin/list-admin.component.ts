import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { AdminPanelService } from '../../services/admin-panel.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-admin',
  standalone: true,
  imports: [RouterModule,NgFor,NgIf,DataTablesModule],
  templateUrl: './list-admin.component.html',
  styleUrl: './list-admin.component.css'
})
export class ListAdminComponent implements OnInit{

  adminPanel:any = [];
  dtOptions: Config = {};
  dttrigger:Subject<any> = new Subject<any>();

  constructor(
    private adminPanelservice: AdminPanelService,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.adminPanelservice.getAdminPanels().subscribe(
      (data: any) => {
        console.log(data.user);
        this.adminPanel = data;
        this.dttrigger.next(null);
      },
      (error) => {
        console.error('Error fetching admin panels:', error);
        this.toastr.error('Failed to load admin panels', 'Error');
      }
    );
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  delete(id: any, i: any) {
    const confirmDelete = confirm("Are you sure you want to delete this Admin? This action cannot be undone.");
    if (confirmDelete) {
      this.adminPanelservice.deleteAdminPanel(id).subscribe(() => {
        this.adminPanel.splice(i, 1);
        this.toastr.error('Admin deleted Successfully!', 'Deletion');
      }, (err) => {
        alert("An error occurred while trying to delete the Admin.");
        console.log(err);
      });
    } else {
      this.toastr.error('Admin deletion canceled', 'Deletion');
    }
  }

}
