import { Component, OnInit } from '@angular/core';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { ClientService } from '../../services/client.service';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-list-client-company',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf, DataTablesModule],
  templateUrl: './list-client-company.component.html',
  styleUrl: './list-client-company.component.css',
})
export class ListClientCompanyComponent implements OnInit {
  Clients: any = [];
  dtOptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();

  constructor(
    private clientService: ClientService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.clientService.getClients().subscribe(
      (data: any) => {
        const filteredClients = data.filter(
          (client: any) => client.user.type == 4
        );
        if (filteredClients.length > 0) {
          this.Clients = filteredClients;
          this.dttrigger.next(null);
        }
      },
      (error) => {
        //console.error('Error fetching clients:', error);
        this.toastr.error('Failed to load clients', 'Error');
      }
    );
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
  }

  delete(id: any, i: any) {
    const confirmDelete = confirm(
      'Are you sure you want to delete this client? This action cannot be undone.'
    );
    if (confirmDelete) {
      this.clientService.deleteClient(id).subscribe(
        () => {
          this.Clients.splice(i, 1);
          this.toastr.error('Client deleted Successfully!', 'Deletion');
        },
        (err) => {
          alert('An error occurred while trying to delete the Client.');
          //console.log(err);
        }
      );
    } else {
      this.toastr.error('Client deletion canceled', 'Deletion');
    }
  }
}
