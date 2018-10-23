import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import { WardEditComponent } from './ward-edit/ward-edit.component';
import { WardCreateComponent } from './ward-create/ward-create.component';
import { WardIndexComponent } from './ward-index/ward-index.component';
import { WardsComponent } from './wards.component';

const routes: Routes = [{
  path: '',
  component: WardsComponent,
  data: {title: 'Wards'},
  children: [
    {
      path: '',
      component: WardIndexComponent,
      data: {title: ''},
    },
    {
      path: 'create',
      component: WardCreateComponent,
      data: {title: 'Add Wards'}
    },
    {
      path: ':id',
      component: WardEditComponent,
      data: {title: 'Edit Wards'}
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class WardsRoutingModule {
}
