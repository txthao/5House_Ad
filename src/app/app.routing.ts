import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers


import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { DefaultLayoutComponent } from './containers/default-layout';
import { ProvincesComponent } from './views/base-setting/provinces/provinces.component';
import { AuthGuardService as AuthGuard } from './shared/services/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'provinces',
        loadChildren: './views/base-setting/provinces/provinces.module#ProvincesModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'districts',
        loadChildren: './views/base-setting/districts/districts.module#DistrictsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'wards',
        loadChildren: './views/base-setting/wards/wards.module#WardsModule',
        canActivate: [AuthGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
