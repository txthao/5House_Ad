import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';
import {PaginationModule} from 'ngx-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WardsService } from '../../../shared/services/wards.service';
import { DistrictsService } from '../../../shared/services/districts.service';
import { ProvincesService } from '../../../shared/services/provinces.service';
import { StreetAddComponent } from './street-add/street-add.component';
import { StreetEditComponent } from './street-edit/street-edit.component';
import { StreetIndexComponent } from './street-index/street-index.component';
import { StreetsComponent } from './streets.component';
import { StreetsService } from '../../../shared/services/streets.service';
import { StreetsRoutingModule } from './streets.routing';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    StreetsRoutingModule,
    PaginationModule,
    NgbModule,
  ],
  providers: [StreetsService, WardsService, DistrictsService, ProvincesService],
  declarations: [StreetsComponent, StreetIndexComponent, StreetEditComponent, StreetAddComponent]
})
export class StreetsModule { }
