import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from '../customer/customer.component';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { CheckBookComponent } from '../checkout-book/checkout-book.component';
import { FinesComponent } from '../fines/fines.component';

const routes: Routes = [
   { 
     path: 'books', 
     component: CustomerComponent 
   },
   { 
     path: 'books/add', 
     component: AddCustomerComponent 
   },
   { 
    path: 'books/checkout', 
    component: CheckBookComponent 
  },
  { 
    path: 'books/fines', 
    component: FinesComponent 
  },
   { 
     path: 'customers/:id', 
     component: CustomerDetailsComponent 
   },
   { 
     path: '', 
     redirectTo: 'books', 
     pathMatch: 'full'
   }, 
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}