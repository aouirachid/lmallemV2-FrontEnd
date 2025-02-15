import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { HandyManService } from '../../services/handy-man.service';
import { ToastrService } from 'ngx-toastr';
import { NgFor, NgIf } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-list-handy-man',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf, DataTablesModule],
  templateUrl: './list-handy-man.component.html',
  styleUrl: './list-handy-man.component.css',
})
export class ListHandyManComponent implements OnInit {
  HandyMen: any = [];
  dtOptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();

  constructor(
    private handyManService: HandyManService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.handyManService.getHandyMen().subscribe(
      (response: any) => {
        console.log(response);
        this.HandyMen = response;
        this.dttrigger.next(null);
      },
      (error) => {
        console.error('Error fetching handyman:', error);
        this.toastr.error('Failed to load handyman', 'Error');
      }
    );
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
  }

  delete(id: any, i: any) {
    const confirmDelete = confirm(
      'Are you sure you want to delete this handyman? This action cannot be undone.'
    );
    if (confirmDelete) {
      this.handyManService.deleteHandyMan(id).subscribe(
        () => {
          this.HandyMen.splice(i, 1);
          this.toastr.error('Handyman deleted Successfully!', 'Deletion');
        },
        (err) => {
          console.error('Error deleting handyman:', err);
          alert('An error occurred while trying to delete the Handyman.');
        }
      );
    } else {
      this.toastr.error('Handyman deletion canceled', 'Deletion');
    }
  }
}
