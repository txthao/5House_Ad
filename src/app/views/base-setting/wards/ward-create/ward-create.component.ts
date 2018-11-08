import { Component, OnInit } from '@angular/core';
import { Province } from '../../../../shared/models/base-setting/province';
import { Session } from '../../../../shared/models/auth/session';
import { DistrictsService } from '../../../../shared/services/districts.service';
import { ProvincesService } from '../../../../shared/services/provinces.service';
import { AuthenticateService } from '../../../../shared/services/authenticate.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../../shared/services/alert.service';
import { Wards } from '../../../../shared/models/base-setting/wards';
import { District } from '../../../../shared/models/base-setting/district';
import { WardsService } from '../../../../shared/services/wards.service';

@Component({
  selector: 'app-ward-create',
  templateUrl: './ward-create.component.html'
})
export class WardCreateComponent implements OnInit {

  provinces: Province[];
  districts: District[];
  provinceId: string = "";
  districtId: string;
  wards = [];
  session: Session;

  constructor(private wardsService: WardsService, private districtsService: DistrictsService,
    private provincesService: ProvincesService, private router: Router, 
    private alertService: AlertService,
    private authService: AuthenticateService) { }

  ngOnInit() {
    this.authService.session$.subscribe(data => this.session = data);
    this.getProvinces();
    this.searchDistricts();

  }

  onSelectedProvince() {
    this.searchDistricts(this.provinceId, null);
  }

  onSelectedDistrict() {
    console.log(this.wards.length);
    if (this.wards.length === 0) {
      this.newItem();
    }
  }

  newItem() {
    let ward = new Wards();
    ward.index = this.wards.length;
    this.wards.push(ward);
  }

  removeItem(index) {
    this.wards.splice(index, 1);
  }

  createWards() {
    this.wardsService.createWard(this.session.name, this.districtId, this.wards).subscribe(
      res => {
        if (res.success) {
          this.alertService.success('Successfully Created', true, true);
          this.router.navigateByUrl('/wards');
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

  searchDistricts(provinceId: string = null, districtName: string = null) {
    this.districtsService.searchDistricts(null, provinceId, districtName).subscribe(
      res => {
        if (res.success) {
          this.districts = res.data;
        }
      },
      err => {
        console.log(err);
      });
  }

}
