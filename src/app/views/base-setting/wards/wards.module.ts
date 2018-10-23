import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';
import {PaginationModule} from 'ngx-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WardsRoutingModule } from './wards.routing';
import { WardsService } from '../../../shared/services/wards.service';
import { WardsComponent } from './wards.component';
import { WardIndexComponent } from './ward-index/ward-index.component';
import { WardEditComponent } from './ward-edit/ward-edit.component';
import { WardCreateComponent } from './ward-create/ward-create.component';
import { DistrictsService } from '../../../shared/services/districts.service';
import { ProvincesService } from '../../../shared/services/provinces.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    WardsRoutingModule,
    PaginationModule,
    NgbModule,
  ],
  providers: [WardsService, DistrictsService, ProvincesService],
  declarations: [WardsComponent, WardIndexComponent, WardEditComponent, WardCreateComponent]
})
export class WardsModule { }
