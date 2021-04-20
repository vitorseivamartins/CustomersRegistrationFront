import { Component, OnInit } from '@angular/core';

import { ICustomer } from '../interfaces/ICustomer';
import { Service } from '../services/customer.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public customers: Array<ICustomer>;
  public selectedCustomer: ICustomer;
  showRegistrationForm: boolean = false;

  constructor(private service: Service) { }

  ngOnInit(): void {
    this.getCustomer()
  };

  getCustomer() {
    this.service.getCustomers()
    .subscribe((resp: Array<ICustomer>) => {
      this.customers = resp;
    }, error => (
      console.log('error getting customers')
    ));
  }

  editCustomer(customer: ICustomer) {
    this.showRegistrationForm = true
    this.selectedCustomer = customer 
  }

  registerNewCustomer() {
    this.showRegistrationForm = true
  }

  customerSaved() {
    this.selectedCustomer = undefined
    this.showRegistrationForm = false
    this.getCustomer()
  }
}
