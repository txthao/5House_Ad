import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../shared/models/customer/customer';
import { CustomersService } from '../../../shared/services/customers.service';
import { AlertService } from '../../../shared/services/alert.service';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../../shared/services/authenticate.service';
import { Session } from '../../../shared/models/auth/session';
import { Utils } from '../../../shared/config/utils';

@Component({
  selector: 'app-customer-index',
  templateUrl: './customer-index.component.html'
})
export class CustomerIndexComponent implements OnInit {

  totalItems: number;
  currentPage = 1;
  itemsPerPage: number;
  selectedAll = false;
  isChecked = false;
  customers: Customer[];
  customer: Customer = new Customer();
  session: Session;

  constructor(private customersService: CustomersService, private alertService: AlertService, 
    private authService: AuthenticateService, private router: Router) { }

  ngOnInit() {
    this.customer.login_type = "";
    this.customer.is_active = "";
    this.authService.session$.subscribe(data => this.session = data);
    this.searchCustomers();
  }

  pageChanged(event: any): void {
    this.selectedAll = false;
    this.currentPage = event.page;
    this.searchCustomers();
  }

  onSearch() {
    this.searchCustomers(this.customer);
  }

  searchCustomers(customer: Customer = null) {
    this.selectedAll = false;
    this.customersService.searchCustomers(this.currentPage, customer).subscribe(
      res => {
        if (res.success) {
          this.customers = res.data.data;
          this.totalItems = res.data.total;
          this.itemsPerPage = res.data.per_page;
          this.customers.forEach(i => {
            i.phone = Utils.formatDisplayPhoneNumber(i.phone);
          })
        }
      },
      err => {
        console.log(err);
      });
  }

  activeCustomer(id: string) {
    this.customersService.activeCustomer(this.session.name, id).subscribe(
      res => {
        if (res.success) {        
          this.alertService.success('Successfully Actived!!!');
          this.searchCustomers();
        }
      },
      err => {
        console.log(err);
      });
  }

  lockCustomer(id: string) {
    this.customersService.lockCustomer(this.session.name, id).subscribe(
      res => {
        if (res.success) {        
          this.alertService.success('Successfully Locked!!!');
          this.searchCustomers();
        }
      },
      err => {
        console.log(err);
      });
  }

}
