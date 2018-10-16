import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {DistrictsService} from '../../../../shared/services/districts.service';
import {ProvincesService} from '../../../../shared/services/provinces.service';
import { District } from '../../../../shared/models/base-setting/district';
import { Province } from '../../../../shared/models/base-setting/province';

@Component({
  selector: 'app-district-edit',
  templateUrl: './district-edit.component.html'
})
export class DistrictEditComponent implements OnInit {

  district: District = new District();
  districtId = this.activedRoute.snapshot.params['id'];
  provinces: Province[];
  provinceId: number;

  constructor(private districtsService: DistrictsService, private provincesService: ProvincesService, private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getProvinces();
    this.getDistrict();
  }

  getDistrict() {
    this.districtsService.getDistrict(this.districtId).subscribe(
      res => {
        if (res.success) {
          this.district = res.data;
          this.provinceId = res.data.province_id;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getProvinces() {
    this.provincesService.getProvinces().subscribe(
      res => {
        if (res.success) {
          this.provinces = res.data.data;
        }
      },
      err => {
        console.log(err);
      });
  }
}
