import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { CustomersComponent } from './customers.component';
import { CustomerIndexComponent } from './customer-index/customer-index.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';

const routes: Routes = [{
  path: '',
  component: CustomersComponent,
  data: {title: 'Customers'},
  children: [
    {
      path: '',
      component: CustomerIndexComponent,
      data: {title: ''},
    },
    {
      path: ':id',
      component: CustomerDetailsComponent,
      data: {title: 'Details Customer'}
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CustomersRoutingModule {
}
