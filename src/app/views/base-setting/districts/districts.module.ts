import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DistrictsComponent} from './districts.component';
import {DistrictIndexComponent} from './district-index/district-index.component';
import {DistrictCreateComponent} from './district-create/district-create.component';
import {DistrictEditComponent} from './district-edit/district-edit.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';
import {PaginationModule} from 'ngx-bootstrap';
import {DistrictsRoutingModule} from './districts.routing';
import {ProvincesService} from '../../../shared/services/provinces.service';
import {DistrictsService} from '../../../shared/services/districts.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DistrictsRoutingModule,
    PaginationModule,
    NgbModule,
  ],
  providers: [DistrictsService, ProvincesService],
  declarations: [DistrictsComponent, DistrictIndexComponent, DistrictEditComponent, DistrictCreateComponent]
})

export class DistrictsModule {
}
