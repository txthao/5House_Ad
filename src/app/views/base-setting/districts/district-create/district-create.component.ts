import { Component, OnInit } from '@angular/core';
import { DistrictsService } from '../../../../shared/services/districts.service';
import {ProvincesService} from '../../../../shared/services/provinces.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../../shared/services/alert.service';
import { AuthenticateService } from '../../../../shared/services/authenticate.service';
import { District } from '../../../../shared/models/base-setting/district';
import { Province } from '../../../../shared/models/base-setting/province';
import { Session } from '../../../../shared/models/auth/session';

@Component({
  selector: 'app-district-create',
  templateUrl: './district-create.component.html'
})
export class DistrictCreateComponent implements OnInit {

  provinces: Province[];
  provinceId: string;
  districts = [];
  session: Session;

  constructor(private districtsService: DistrictsService, private provincesService: ProvincesService,private router: Router, private alertService: AlertService,
    private authService: AuthenticateService) { }

  ngOnInit() {
    this.authService.session$.subscribe(data => this.session = data);
    this.getProvinces();

  }

  onSelectedProvince() {
    console.log(this.districts.length);
    if (this.districts.length === 0) {
      this.newItem();
    }
  }

  newItem() {
    let district = new District();
    district.index = this.districts.length;
    this.districts.push(district);
  }

  removeItem(index) {
    this.districts.splice(index, 1);
  }

  createDistricts() {
    this.districtsService.createDistrict(this.session.name, this.provinceId, this.districts).subscribe(
      res => {
        if (res.success) {
          this.alertService.success('Successfully Created', true, true);
          this.router.navigateByUrl('/districts');
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
