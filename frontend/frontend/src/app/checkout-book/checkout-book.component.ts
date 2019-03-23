import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { Book } from '../book';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-checkout-book',
  templateUrl: './checkout-book.component.html',
  styleUrls: ['./checkout-book.component.css']
})


export class CheckBookComponent  implements OnInit {

  book: Book;
  author: '';
  title: '';
  isbn: '';
  borrower;
  loading = false
  error = false
  action = '';


  constructor(private customerService: CustomerService, private router:Router, public activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if(params['isbn']&&params['title']&&params['name']&&params['action']) {
        this.book = new Book();
        this.book.isbn = params['isbn']
        this.book.title = params['title']
        this.book.author = params['name']
        this.action = params['action']
        this.borrower=params['card_id']?params['card_id']:''
      }
      else {
        this.router.navigate(['books']);
      }
    })
  }

  checkoutBook () {
    if(this.action == 'checkout') {
      let obj = {isbn:'',card_id:''};
      obj.isbn = this.book.isbn;
      obj.card_id = this.borrower
      return this.customerService.addBorrower(obj)
      .subscribe(
        res => {
          if(res.msg == 'error') {
            let self = this;
            this.error = true;
            setTimeout(function(){
              self.error = false;  
            }, 2000)
          }
          else {
            let self = this;
            this.loading = true;
            setTimeout(function(){
              self.router.navigate(['books']);
    
            }, 2000)
          }
        });
    }
    else {
      let obj = {isbn:'',card_id:''};
      obj.isbn = this.book.isbn;
      obj.card_id = this.borrower
      return this.customerService.checkinBook(obj)
      .subscribe(
        res => {
          if(res.msg == 'error') {
            let self = this;
            this.error = true;
            setTimeout(function(){
              self.error = false;  
            }, 2000)
          }
          else {
            let self = this;
            this.loading = true;
            setTimeout(function(){
              self.router.navigate(['books']);
    
            }, 2000)
          }
        });
    }

    }
  }
