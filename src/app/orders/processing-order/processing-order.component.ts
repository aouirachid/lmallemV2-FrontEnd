import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { OrdersService } from '../../services/orders.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditOrderModalComponent } from '../edit-order-modal/edit-order-modal.component';

@Component({
  selector: 'app-processing-order',
  standalone: true,
  imports: [RouterModule, NgFor, DataTablesModule, CommonModule],
  templateUrl: './processing-order.component.html',
  styleUrl: './processing-order.component.css',
})
export class ProcessingOrderComponent {
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  Orders: any[] = [];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private modal: NgbModal,
    private orderService: OrdersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [
        [10, 25, 50, -1],
        [10, 25, 50, 'All'],
      ],
      processing: true,
      searching: true,
      language: {
        searchPlaceholder: 'Search...',
        lengthMenu: '_MENU_ records per page',
      },
      responsive: true,
    };

    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe({
      next: (data: any) => {
        if (!data || !Array.isArray(data)) {
          this.Orders = [];
        } else {
          this.Orders = data.filter((order: any) => order.orderStatus == 2);
        }

        // Rerender the DataTable
        if (this.dtElement) {
          this.dtElement.dtInstance.then((dtInstance) => {
            dtInstance.destroy();
            this.dtTrigger.next(null);
          });
        } else {
          this.dtTrigger.next(null);
        }
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        this.toastr.error('Failed to load orders', 'Error');
        this.Orders = [];
        this.dtTrigger.next(null);
      },
    });
  }

  openEdit(orderId: number) {
    const modalRef = this.modal.open(EditOrderModalComponent, {
      windowClass: 'modal-order-edit',
      backdrop: 'static',
      keyboard: false,
      ariaLabelledBy: 'modal-basic-title',
    });

    modalRef.componentInstance.orderId = orderId;

    modalRef.result.then(
      (result) => {
        if (result?.success) {
          this.loadOrders();
        }
      },
      () => {} // Dismiss handler
    );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
