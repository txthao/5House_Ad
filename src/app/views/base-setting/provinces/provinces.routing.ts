import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvinceIndexComponent } from './province-index/province-index.component';
import { ProvinceEditComponent } from './province-edit/province-edit.component';
import { ProvinceCreateComponent } from './province-create/province-create.component';
import { ProvincesComponent } from './provinces.component';
import { AuthGuardService  as AuthGuard  } from '../../../shared/services/auth-guard.service';

const routes: Routes = [{
  path: '',
  component: ProvincesComponent,
  data: { title: 'Provinces' },
  children: [
    {
      path: '',
      component: ProvinceIndexComponent,
      data: { title: '' },
      canActivate: [AuthGuard]
    },
    {
      path: 'create',
      component: ProvinceCreateComponent,
      data: { title: 'Create Province' },
      canActivate: [AuthGuard]
    },
    {
      path: ':id',
      component: ProvinceEditComponent,
      data: { title: 'Edit Province' },
      canActivate: [AuthGuard]
    }
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvincesRoutingModule { }
