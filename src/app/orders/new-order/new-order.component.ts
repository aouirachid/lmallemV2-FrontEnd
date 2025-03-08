import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrdersService } from '../../services/orders.service';
import { ClientService } from '../../services/client.service';
import { HandyManService } from '../../services/handy-man.service';
import { ServiceService } from '../../services/service.service';
import { Service } from '../../Models/Service';
import { Client } from '../../Models/Client';
import { HandyMan } from '../../Models/HandyMan';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import {
  map,
  Observable,
  startWith,
  forkJoin,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';

@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CurrencyPipe,
    AsyncPipe,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
  ],
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css'],
})
export class NewOrderComponent implements OnInit {
  orderForm: FormGroup;
  allServices: Service[] = [];
  allClients: Client[] = [];
  allHandyMans: HandyMan[] = [];
  filteredServices!: Observable<Service[]>;
  filteredClients!: Observable<Client[]>;
  filteredHandyMans!: Observable<HandyMan[]>;

  constructor(
    private fb: FormBuilder,
    private orderService: OrdersService,
    private clientService: ClientService,
    private handyManService: HandyManService,
    private serviceService: ServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.orderForm = this.fb.group({
      orderNumber: [''],
      serviceId: [null, Validators.required], // Changed from '' to null
      orderPrice: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.maxLength(500)],
      orderDate: [new Date().toISOString(), Validators.required],
      deliveredDate: [''],
      clientId: [null, Validators.required], // Changed from '' to null
      handyManId: [null, Validators.required], // Changed from '' to null
    });
  }
  get serviceControl() {
    return this.orderForm.get('serviceId') as FormControl;
  }

  get clientControl() {
    return this.orderForm.get('clientId') as FormControl;
  }

  get handyManControl() {
    return this.orderForm.get('handyManId') as FormControl;
  }

  ngOnInit(): void {
    this.generateOrderNumber();
    this.setupFilters();
    this.loadInitialData();
  }

  // Add displayWith functions
  displayService(serviceId: number): string {
    const service = this.allServices.find((s) => s.id === serviceId);
    return service?.name || '';
  }

  displayClient(clientId: number): string {
    const client = this.allClients.find((c) => c.id === clientId);
    return client?.user?.name || '';
  }

  displayHandyMan(handyManId: number): string {
    const handyMan = this.allHandyMans.find((h) => h.id === handyManId);
    return handyMan?.user?.name || '';
  }

  private setupFilters(): void {
    this.filteredServices = this.orderForm.get('serviceId')!.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      map((value) => (typeof value === 'string' ? value : '')),
      map((value) => this._filterServices(value))
    );

    this.filteredClients = this.orderForm.get('clientId')!.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      map((value) => this._filterClients(value))
    );

    this.filteredHandyMans = this.orderForm
      .get('handyManId')!
      .valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        map((value) => this._filterHandyMans(value))
      );
  }
  private _filterServices(value: any | null): Service[] {
    let filterValue = '';
    if (typeof value === 'string') {
      filterValue = value.toLowerCase();
    } else if (typeof value === 'number') {
      filterValue = value.toString().toLowerCase();
    }
    return this.allServices.filter((service) =>
      service.name.toLowerCase().includes(filterValue)
    );
  }

  private _filterClients(value: any | null): Client[] {
    let filterValue = '';
    if (typeof value === 'string') {
      filterValue = value.toLowerCase();
    } else if (typeof value === 'number') {
      filterValue = value.toString().toLowerCase();
    }
    return this.allClients.filter(
      (client) =>
        (client.user.name ? client.user.name.toLowerCase() : '').includes(
          filterValue
        ) ||
        (client.user.phone ? client.user.phone.toLowerCase() : '').includes(
          filterValue
        )
    );
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

  onServiceSelect(event: MatAutocompleteSelectedEvent): void {
    const serviceId = event.option.value;
    const selectedService = this.allServices.find((s) => s.id === serviceId);
    if (selectedService?.category) {
      this.orderForm.patchValue({
        orderPrice: selectedService.category.estimatedPrice,
      });
    }
  }

  private generateOrderNumber(): void {
    const newNumber = 'LM-' + Math.random().toString().slice(2, 13);
    this.orderForm.patchValue({
      orderNumber: newNumber,
      orderDate: new Date().toISOString().slice(0, 16),
    });
  }

  private loadInitialData(): void {
    forkJoin({
      services: this.serviceService.getServices(),
      clients: this.clientService.getClients(),
      handyMans: this.handyManService.getHandyMen(),
    }).subscribe({
      next: ({ services, clients, handyMans }) => {
        this.allServices = services;
        this.allClients = clients;
        this.allHandyMans = handyMans;

        // Force update of autocomplete filters
        ['serviceId', 'clientId', 'handyManId'].forEach((control) => {
          this.orderForm
            .get(control)
            ?.setValue(this.orderForm.get(control)?.value);
        });
      },
      error: (err) => {
        this.toastr.error('Failed to load initial data');
        console.error(err);
      },
    });
  }

  onSubmit(): void {
    // Implement form submission logic here.
  }
}
