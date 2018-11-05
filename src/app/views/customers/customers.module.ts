import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerIndexComponent } from './customer-index/customer-index.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CustomersRoutingModule } from './customers.routing';
import { PaginationModule } from 'ngx-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomersService } from '../../shared/services/customers.service';
import { CustomersComponent } from './customers.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CustomersRoutingModule,
    PaginationModule,
    NgbModule,
  ],
  providers: [CustomersService],
  declarations: [CustomersComponent, CustomerIndexComponent, CustomerDetailsComponent]
})
export class CustomersModule { }
