import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../shared/models/customer/customer';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../../shared/services/customers.service';
import { Utils } from '../../../shared/config/utils';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html'
})
export class CustomerDetailsComponent implements OnInit {

  customer: Customer = new Customer();
  customerId = this.activedRoute.snapshot.params['id'];

  constructor(private customersService: CustomersService, private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getCustomer();
  }

  getCustomer() {
    this.customersService.getCustomer(this.customerId).subscribe(
      res => {
        if (res.success) {
          this.customer = res.data;
          this.customer.phone = Utils.formatDisplayPhoneNumber(this.customer.phone);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
