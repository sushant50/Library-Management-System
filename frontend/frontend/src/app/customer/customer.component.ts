import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { Book } from '../book';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})


export class CustomerComponent  implements OnInit {

  customers: Book;
  author: '';
  title: '';
  isbn: '';

  constructor(private customerService: CustomerService, private router:Router, public activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
  }

  getBooks() {
    let book = new Book();
    book.isbn = this.isbn ? this.isbn: '';
    book.author = this.author ? this.author: '';
    book.title =  this.title ? this.title: '';;
    return this.customerService.getBooks(book)
    .subscribe(
      customers => {
        this.customers = customers
      });   
    }
  
  checkout(book) {
    console.log(book)
    this.router.navigate(['books/checkout'], { 
      queryParams: 
      {
        isbn: book.Isbn,
        title: book.Title,
        name: book.Name,
        action:"checkout"
      } 
    });
  }

  checkin(book) {
    console.log(book)
    this.router.navigate(['books/checkout'], { 
      queryParams: 
      {
        isbn: book.Isbn,
        title: book.Title,
        name: book.Name,
        card_id:book.card_id,
        action:"checkin"
      } 
    });
  }

}
