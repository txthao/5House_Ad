import { Component, OnInit } from '@angular/core';
import { Province } from '../../../shared/models/base-setting/province';
import { ProvincesService } from '../../../shared/services/provinces.service';
import { Constants } from '../../../shared/config/constants';

@Component({
  selector: 'app-provinces',
  templateUrl: './provinces.component.html'
})
export class ProvincesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
   
  }
 
}
