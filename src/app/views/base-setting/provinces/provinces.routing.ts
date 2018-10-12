import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvinceIndexComponent } from './province-index/province-index.component';
import { ProvinceEditComponent } from './province-edit/province-edit.component';
import { ProvinceCreateComponent } from './province-create/province-create.component';
import { ProvincesComponent } from './provinces.component';


const routes: Routes = [{
  path: '',
  component: ProvincesComponent,
  data: { title: 'Provinces' },
  children: [
    {
      path: '',
      component: ProvinceIndexComponent,
      data: { title: '' },
    },
    {
      path: 'create',
      component: ProvinceCreateComponent,
      data: { title: 'Create Province' }
    },
    {
      path: ':id',
      component: ProvinceEditComponent,
      data: { title: 'Edit Province' }
    }
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvincesRoutingModule { }
