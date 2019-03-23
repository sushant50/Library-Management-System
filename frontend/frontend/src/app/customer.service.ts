import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer';
import { Book } from './book';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customersUrl = 'http://localhost:8080/api/customers';  // URL to web api
  options: any;
  constructor( 
    private http: HttpClient
  ) { }

  getCustomers (): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl)
  }

  getCustomer(id: number): Observable<Customer> {
    const url = `${this.customersUrl}/${id}`;
    return this.http.get<Customer>(url);
  }
  refreshFines(): Observable<any> {
    const url = `${this.customersUrl}/refreshFines`;
    return this.http.get<any>(url);
  }
  findFineList(obj): Observable<any> {
    const url = `${this.customersUrl}/getFineList`;
    return this.http.post<any>(url, obj, httpOptions);
  }
  payFine(obj): Observable<any> {
    const url = `${this.customersUrl}/payFine`;
    return this.http.post<any>(url, obj, httpOptions);
  }

  

  getBooks(Book: Book): Observable<Book> {
    return this.http.post<Book>(this.customersUrl, Book, httpOptions);

  }

  addBorrower(obj): Observable<any> {
    const url = `${this.customersUrl}/addBorrower`;
    return this.http.post<any>(url, obj, httpOptions);

  }

  checkinBook(obj): Observable<any> {
    const url = `${this.customersUrl}/checkinBook`;
    return this.http.post<any>(url, obj, httpOptions);

  }

  addCustomer(obj): Observable<any> {
    const url = `${this.customersUrl}/addCustomer`;
    return this.http.post<any>(url, obj, httpOptions);

  }


  // deleteCustomer (customer: Customer | number): Observable<Customer> {
  //   const id = typeof customer === 'number' ? customer : customer.id;
  //   const url = `${this.customersUrl}/${id}`;

  //   return this.http.delete<Customer>(url, httpOptions);
  // }

  updateCustomer (customer: Customer): Observable<any> {
    return this.http.put(this.customersUrl, customer, httpOptions);
  }
}