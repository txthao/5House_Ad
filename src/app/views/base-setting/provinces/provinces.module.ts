import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvincesRoutingModule } from './provinces.routing';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

import { ProvinceCreateComponent } from './province-create/province-create.component';
import { ProvinceIndexComponent } from './province-index/province-index.component';
import { ProvinceEditComponent } from './province-edit/province-edit.component';
import { ProvincesService } from '../../../shared/services/provinces.service';
import { ProvincesComponent } from './provinces.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ProvincesRoutingModule,
    PaginationModule
  ],
  providers: [ProvincesService],
  declarations: [ProvincesComponent, ProvinceIndexComponent, ProvinceCreateComponent, ProvinceEditComponent,  ]
})
export class ProvincesModule { }