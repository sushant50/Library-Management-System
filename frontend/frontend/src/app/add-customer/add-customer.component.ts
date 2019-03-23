import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})

export class AddCustomerComponent{

  customer = new Customer();
  borrower = new Customer();
  submitted = false;

  constructor(
    private customerService: CustomerService,
    private location: Location
  ) { }

  newCustomer(): void {
    this.submitted = false;
    this.customer = new Customer();
  }

 addCustomer() {
   this.save();
 }

  goBack(): void {
    this.location.back();
  }
  
  formatPhoneNumber(str) {
    var USNumber = str.match(/(\d{3})(\d{3})(\d{4})/);
    USNumber = "(" + USNumber[1] + ") " + USNumber[2] + "-" + USNumber[3];
    return USNumber
  }

  formatSSN(str) {
    var SSN = str.match(/(\d{3})(\d{2})(\d{4})/);
    SSN =  SSN[1] + "-" + SSN[2] + "-" + SSN[3];
    return SSN
  }

  private save() {
    
    this.borrower.phone = this.formatPhoneNumber(this.customer.phone)
    this.borrower.ssn =  this.formatSSN(this.customer.ssn)
    this.borrower.firstname = this.customer.firstname;
    this.borrower.address = this.customer.address;
    console.log(this.borrower);

    return this.customerService.addCustomer(this.borrower)
    .subscribe(
      res => {
        this.submitted = true;
      });
  }
}
