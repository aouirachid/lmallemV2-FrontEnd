import { Component, OnInit, Pipe } from '@angular/core';
import {
  FormBuilder,
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
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-new-order',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.css',
})
export class NewOrderComponent implements OnInit {
  orderForm: FormGroup;
  filteredServices: Service[] = [];
  filteredClients: Client[] = [];
  filteredHandyMans: HandyMan[] = [];
  allServices: Service[] = [];
  allClients: Client[] = [];
  allHandyMans: HandyMan[] = [];

  constructor(
    private fb: FormBuilder,
    private orderService: OrdersService,
    private clients: ClientService,
    private handyMans: HandyManService,
    private services: ServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.orderForm = this.fb.group({
      orderNumber: [''],
      serviceId: ['', Validators.required],
      orderPrice: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.maxLength(500)],
      orderDate: [new Date().toISOString().slice(0, 16)],
      deliveredDate: [''],
      clientId: ['', Validators.required],
      handyManId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.generateOrderNumber();
    this.loadInitialData();
  }

  private generateOrderNumber(): void {
    // Implement your logic or call service
    const newNumber = 'LM-' + Math.random().toString().slice(2, 13);
    this.orderForm.patchValue({ orderNumber: newNumber });
  }

  private loadInitialData(): void {
    this.services.getServices().subscribe((services: Service[]) => {
      this.allServices = services;
      this.filteredServices = services;
    });

    this.clients.getClients().subscribe((clients: Client[]) => {
      this.allClients = clients;
      this.filteredClients = clients;
    });

    this.handyMans.getHandyMen().subscribe((handyMans: HandyMan[]) => {
      this.allHandyMans = handyMans;
      this.filteredHandyMans = handyMans;
    });
  }

  onServiceSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredServices = this.allServices.filter((service) =>
      service.name.toLowerCase().includes(value)
    );

    this.orderForm.get('serviceId')?.valueChanges.subscribe((serviceId) => {
      const selectedService = this.allServices.find((s) => s.id === serviceId);
      if (selectedService?.category) {
        this.orderForm.patchValue({
          orderPrice: selectedService.category.estimatedPrice,
        });
      }
    });
  }

  onClientSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredClients = this.allClients.filter(
      (client) =>
        client.phone.toLowerCase().includes(value) ||
        client.name.toLowerCase().includes(value)
    );
  }

  onHandyManSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredHandyMans = this.allHandyMans.filter(
      (handyMan) =>
        handyMan.phone.toLowerCase().includes(value) ||
        handyMan.name.toLowerCase().includes(value)
    );
  }

  onSubmit(): void {}
}
