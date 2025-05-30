import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
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
  catchError,
  of,
  finalize,
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
  loading = false;
  submitting = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private handyManService: HandyManService,
    private toastr: ToastrService,
    private svc: OrdersService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      orderPrice: ['', [Validators.required]],
      orderLocation: ['', [Validators.required]],
      orderDescription: ['', [Validators.required]],
      orderDeliveredAt: [new Date().toISOString().slice(0, 16)],
      handy_men_id: ['', [Validators.required]],
      orderStatus: ['', [Validators.required]],
    });
  }

  get handyManControl() {
    return this.form.get('handy_men_id') as FormControl;
  }

  ngOnInit() {
    this.loading = true;
    
    // Load both initial data and order data concurrently
    forkJoin({
      handyMans: this.handyManService.getHandyMen().pipe(
        catchError(err => {
          console.error('Error loading handymen:', err);
          this.toastr.error('Failed to load handymen data');
          return of([]);
        })
      ),
      order: this.svc.getOrder(this.orderId).pipe(
        catchError(err => {
          console.error('Error loading order:', err);
          this.toastr.error('Failed to load order data');
          return of(null);
        })
      )
    }).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: ({ handyMans, order }) => {
        // Handle handymen data
        this.allHandyMans = handyMans || [];
        
        // Handle order data
        if (order) {
          console.log('Original orderDeliveredAt:', order.orderDeliveredAt);
          
          // Format the date for the datetime-local input
          const deliveredAt = order.orderDeliveredAt ? 
            new Date(order.orderDeliveredAt).toISOString().slice(0, 16) : 
            new Date().toISOString().slice(0, 16);
          
          console.log('Formatted deliveredAt:', deliveredAt);
          
          this.form.patchValue({
            orderPrice: order.orderPrice,
            orderLocation: order.orderLocation,
            orderDescription: order.orderDescription,
            orderDeliveredAt: deliveredAt,
            handy_men_id: order.handy_men_id,
            orderStatus: order.orderStatus,
          });
          
          console.log('Form value after patch:', this.form.value);
          this.orderNumber = order.orderNumber;
        }
        
        // Setup filters
        this.setupFilters();
      },
      error: (err) => {
        console.error('Error in ngOnInit:', err);
        this.toastr.error('Failed to initialize form');
      }
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
      const handyMan = this.allHandyMans.find((h) => h.id === value);
      if (handyMan?.user?.name) {
        return [handyMan];
      }
      filterValue = value.toString().toLowerCase();
    }
    
    return this.allHandyMans.filter(
      (handyMan) =>
        (handyMan.user?.name ? handyMan.user.name.toLowerCase() : '').includes(
          filterValue
        ) ||
        (handyMan.user?.phone ? handyMan.user.phone.toLowerCase() : '').includes(
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

  searchHandyMan = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) => {
        if (!term || !this.allHandyMans || !this.allHandyMans.length) {
          return this.allHandyMans.slice(0, 10);
        }
        
        return this.allHandyMans
          .filter(
            (handyMan) =>
              (handyMan.user?.name?.toLowerCase().includes(term.toLowerCase()) || false) ||
              (handyMan.user?.phone?.toLowerCase().includes(term.toLowerCase()) || false)
          )
          .slice(0, 10);
      })
    );

  formatter = (handyMan: HandyMan) => {
    if (!handyMan || !handyMan.user) return '';
    return handyMan.user.name || '';
  };

  selectHandyMan(event: any) {
    if (event && event.item) {
      this.form.patchValue({
        handy_men_id: event.item.id,
      });
    }
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastr.error('Please fill all required fields', 'Validation Error');
      return;
    }
    
    this.submitting = true;
    const formData = { ...this.form.value };
    
    console.log('Form value before save:', this.form.value);
    
    // Ensure the date is in ISO format
    if (formData.orderDeliveredAt) {
      const date = new Date(formData.orderDeliveredAt);
      formData.orderDeliveredAt = date.toISOString();
      console.log('Converted date:', formData.orderDeliveredAt);
    }
    
    console.log('Final data being sent to backend:', formData);
    
    this.svc.updateOrder(this.orderId, formData)
      .pipe(
        finalize(() => {
          this.submitting = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.toastr.success('Order updated successfully');
          this.activeModal.close({ success: true, data: response });
        },
        error: (error) => {
          console.error('Error updating order:', error);
          this.toastr.error('Failed to update order');
        },
      });
  }
  
  dismiss() {
    this.activeModal.dismiss();
  }
}