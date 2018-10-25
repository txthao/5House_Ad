import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ProvincesModule } from './views/base-setting/provinces/provinces.module';
import { AlertService } from './shared/services/alert.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { AuthenticateService } from './shared/services/authenticate.service';
import { FormsModule } from '@angular/forms';
import {DispatchArg} from 'rxjs/internal/observable/SubscribeOnObservable';
import {DistrictsModule} from './views/base-setting/districts/districts.module';
import {WardsModule} from './views/base-setting/wards/wards.module';
import {StreetsModule} from './views/base-setting/streets/streets.module'

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    ProvincesModule,
    DistrictsModule,
    WardsModule,
    StreetsModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent

  ],
  providers: [AuthenticateService, AuthGuardService, AlertService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
