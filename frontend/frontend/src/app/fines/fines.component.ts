import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Location } from '@angular/common';

@Component({
  selector: 'app-fines',
  templateUrl: './fines.component.html',
  styleUrls: ['./fines.component.css']
})



export class FinesComponent implements OnInit{
    fines :any = [];
    borrower;
    loading = false;
    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            if(params['borrower_id']) {
              this.borrower = params['borrower_id']
              return this.customerService.findFineList({"borrower":this.borrower})
              .subscribe(
                res => {
                    this.fines = res;
                });
            }
          })    
        }

  findFines(borrower) {
    this.router.navigate(['books/fines'], { 
      queryParams: 
      {
        "borrower_id":this.borrower,
        "frag" : new Date().getTime().toString().slice(0,10)
      } 
    });

  }

  payFine(borrower) {
    console.log(borrower)
    return this.customerService.payFine({"Id":borrower.Id})
    .subscribe(
      res => {
        let self = this;
        this.loading = true;
        setTimeout(function(){
          self.loading = false;
          self.router.navigate(['books/fines'], { 
            queryParams: 
            {
              "borrower_id":self.borrower,
              "frag" : new Date().getTime().toString().slice(0,10)
            } 
          });     
        }, 2000) 
      });


  }

  constructor(
    private customerService: CustomerService,
    private location: Location,
    private router:Router, public activatedRoute: ActivatedRoute
  ) { }

  
}
