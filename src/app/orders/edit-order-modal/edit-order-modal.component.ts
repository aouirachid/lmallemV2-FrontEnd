import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  NgbActiveModal,
  NgbDatepickerModule,
  NgbTypeahead,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { OrdersService } from '../../services/orders.service';
import {
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  map,
  Observable,
  startWith,
} from 'rxjs';
import { HandyMan } from '../../Models/HandyMan';
import { HandyManService } from '../../services/handy-man.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-order-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbTypeaheadModule,
  ],
  templateUrl: './edit-order-modal.component.html',
  styleUrl: './edit-order-modal.component.css',
})
export class EditOrderModalComponent implements OnInit {
  @Input() orderId!: number;
  orderNumber!: string;
  form!: FormGroup;
  allHandyMans: HandyMan[] = [];
  filteredHandyMans!: Observable<HandyMan[]>;
  @ViewChild('instance', { static: true }) instance!: NgbTypeahead;
  searching = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private handyManService: HandyManService,
    private toastr: ToastrService,
    private svc: OrdersService
  ) {
    this.form = this.fb.group({
      orderPrice: [''],
      orderLocation: [''],
      orderDescription: [''],
      orderDeliveredAt: [''],
      handy_men_id: [''],
      orderStatus: [''],
    });
  }

  get handyManControl() {
    return this.form.get('handy_men_id') as FormControl;
  }

  ngOnInit() {
    this.loadInitialData();
    this.setupFilters();
    this.svc.getOrder(this.orderId).subscribe((order) => {
      this.form.patchValue({
        orderPrice: order.orderPrice,
        orderLocation: order.orderLocation,
        orderDescription: order.orderDescription,
        orderDeliveredAt: order.orderDeliveredAt,
        handy_men_id: order.handy_men_id,
        orderStatus: order.orderStatus,
      });
      this.orderNumber = order.orderNumber;
    });
  }

  displayHandyMan(handy_men_id: number): string {
    const handyMan = this.allHandyMans.find((h) => h.id === handy_men_id);
    return handyMan?.user?.name || '';
  }

  private _filterHandyMans(value: any | null): HandyMan[] {
    let filterValue = '';
    if (typeof value === 'string') {
      filterValue = value.toLowerCase();
    } else if (typeof value === 'number') {
      filterValue = value.toString().toLowerCase();
    }
    return this.allHandyMans.filter(
      (handyMan) =>
        (handyMan.user.name ? handyMan.user.name.toLowerCase() : '').includes(
          filterValue
        ) ||
        (handyMan.user.phone ? handyMan.user.phone.toLowerCase() : '').includes(
          filterValue
        )
    );
  }

  private setupFilters(): void {
    this.filteredHandyMans = this.form.get('handy_men_id')!.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      map((value) => this._filterHandyMans(value))
    );
  }

  private loadInitialData(): void {
    forkJoin({
      handyMans: this.handyManService.getHandyMen(),
    }).subscribe({
      next: ({ handyMans }) => {
        this.allHandyMans = handyMans;

        // Force update of autocomplete filters
        ['handy_men_id'].forEach((control) => {
          this.form.get(control)?.setValue(this.form.get(control)?.value);
        });
      },
      error: (err) => {
        this.toastr.error('Failed to load initial data');
        console.error(err);
      },
    });
  }

  searchHandyMan = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        this.allHandyMans
          .filter(
            (handyMan) =>
              handyMan.user.name.toLowerCase().includes(term.toLowerCase()) ||
              handyMan.user.phone.toLowerCase().includes(term.toLowerCase())
          )
          .slice(0, 10)
      )
    );

  formatter = (handyMan: HandyMan) => handyMan.user.name;

  selectHandyMan(event: any) {
    if (event) {
      this.form.patchValue({
        handy_men_id: event.item.id,
      });
    }
  }

  save() {
    this.svc
      .updateOrder(this.orderId, this.form.value)
      .subscribe(() => this.activeModal.close(this.form.value));
  }
}
