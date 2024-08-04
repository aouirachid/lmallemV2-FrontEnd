import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListAdminComponent } from './admin/list-admin/list-admin.component';
import { AddAdminComponent } from './admin/add-admin/add-admin.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ListServiceComponent } from './service/list-service/list-service.component';
import { AddServiceComponent } from './service/add-service/add-service.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { ListHandyManComponent } from './handyMan/list-handy-man/list-handy-man.component';
import { AddHandyManComponent } from './handyMan/add-handy-man/add-handy-man.component';
import { NewOrderComponent } from './orders/new-order/new-order.component';
import { ListNewOrderComponent } from "./orders/list-new-order/list-new-order.component";
import { ProcessingOrderComponent } from './orders/processing-order/processing-order.component';
import { DelivredOrderComponent } from './orders/delivred-order/delivred-order.component';
import { CancelOrderComponent } from './orders/cancel-order/cancel-order.component';

export const routes: Routes = [
    { path : "", component : DashboardComponent , title : "Dashboard" },
    { path : "list-admin", component : ListAdminComponent , title : "List Admin" },
    { path : "add-admin", component : AddAdminComponent , title : "Add Admin" },
    { path : "list-category", component : ListCategoryComponent , title : "List Category" },
    { path : "add-category", component : AddCategoryComponent , title : "Add Category" },
    { path : "list-service", component : ListServiceComponent , title : "List Service" },
    { path : "add-service", component : AddServiceComponent , title : "Add Service" },
    { path : "list-client", component : ListClientComponent , title : "List Client" },
    { path : "add-client", component : AddClientComponent , title : "Add Client" },
    { path : "list-handy-man", component : ListHandyManComponent , title : "list Handy Man" },
    { path : "add-handy-man", component : AddHandyManComponent , title : "Add Handy Man" },
    { path : "new-order", component : NewOrderComponent , title : "New Order" },
    { path : "list-new-order", component:ListNewOrderComponent , title: "List New Order" },
    { path : "processing-order", component : ProcessingOrderComponent , title : "Processing Order" },
    { path : "delivred-order", component : DelivredOrderComponent , title : "Delivred order" },
    { path : "cancel-order", component : CancelOrderComponent , title : "Cancel Order"},    
];