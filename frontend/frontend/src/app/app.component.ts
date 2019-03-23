
import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'app';



  constructor(private customerService: CustomerService, private router:Router, public activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {

  }

  updateFines () {
    return this.customerService.refreshFines()
    .subscribe(
      res => {

      });   
    }
  }
