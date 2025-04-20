import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { OrdersService } from '../../services/orders.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditOrderModalComponent } from '../edit-order-modal/edit-order-modal.component';

@Component({
  selector: 'app-list-new-order',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf, DataTablesModule, CommonModule],
  templateUrl: './list-new-order.component.html',
  styleUrl: './list-new-order.component.css',
})
export class ListNewOrderComponent implements OnInit {
  Orders: any = [];
  dtOptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();
  constructor(
    private modal: NgbModal,
    private orderService: OrdersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(
      (data: any) => {
        console.log(data);

        const filteredOrders = data.filter(
          (order: any) => order.orderStatus == 1
        );
        if (filteredOrders.length > 0) {
          this.Orders = filteredOrders;
          this.dttrigger.next(null);
        }
      },
      (error) => {
        this.toastr.error('Failed to load orders', 'Error');
      }
    );
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
  }

  openEdit(orderId: number) {
    const modalRef = this.modal.open(EditOrderModalComponent, {
      windowClass: 'modal-order-edit',
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.orderId = orderId;
  }
}
