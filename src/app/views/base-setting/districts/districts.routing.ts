import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DistrictsComponent} from './districts.component';
import {DistrictIndexComponent} from './district-index/district-index.component';
import {DistrictEditComponent} from './district-edit/district-edit.component';
import {DistrictCreateComponent} from './district-create/district-create.component';

const routes: Routes = [{
  path: '',
  component: DistrictsComponent,
  data: {title: 'Quận/Huyện'},
  children: [
    {
      path: '',
      component: DistrictIndexComponent,
      data: {title: ''},
    },
    {
      path: 'create',
      component: DistrictCreateComponent,
      data: {title: 'Thêm Quận/Huyện'}
    },
    {
      path: ':id',
      component: DistrictEditComponent,
      data: {title: 'Chỉnh sửa Quận/Huyện'}
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DistrictsRoutingModule {
}
