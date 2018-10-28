import { Component, OnInit } from '@angular/core';
import { Street } from '../../../../shared/models/base-setting/street';
import { WardsService } from '../../../../shared/services/wards.service';
import { DistrictsService } from '../../../../shared/services/districts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../shared/services/alert.service';
import { AuthenticateService } from '../../../../shared/services/authenticate.service';
import { Session } from '../../../../shared/models/auth/session';
import { Wards } from '../../../../shared/models/base-setting/wards';
import { Province } from '../../../../shared/models/base-setting/province';
import { District } from '../../../../shared/models/base-setting/district';
import { ProvincesService } from '../../../../shared/services/provinces.service';
import { StreetsService } from '../../../../shared/services/streets.service';

@Component({
  selector: 'app-street-edit',
  templateUrl: './street-edit.component.html'
})
export class StreetEditComponent implements OnInit {

  street: Street = new Street();
  streetId = this.activedRoute.snapshot.params['id'];
  provinceId = this.activedRoute.snapshot.queryParams['province_id'];
  districtId = this.activedRoute.snapshot.queryParams['district_id'];
  wardId = this.activedRoute.snapshot.queryParams['ward_id'];
  provinces: Province[];
  districts: District[];
  wards: Wards[];
  session: Session;

  constructor(private streetsService: StreetsService, private wardsService: WardsService, private districtsService: DistrictsService, private provincesService: ProvincesService,
    private activedRoute: ActivatedRoute, private router: Router,
    private alertService: AlertService, private authService: AuthenticateService) { }

  ngOnInit() {
    this.authService.session$.subscribe(data => this.session = data);
    this.getStreet();

  }

  onSelectedProvince() {
    this.street.district_id = null;
    this.street.ward_id = null;
    this.districts = [];
    this.wards = [];
    if (this.street.province_id) {
      this.searchDistricts(this.street.province_id);
    }
  }

  onSelectedDistrict() {
    this.street.ward_id = null;
    this.wards = [];
    if (this.street.district_id) {
      this.searchWards(null, this.street.district_id);
    }
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
    this.districtsService.searchDistricts(provinceId, districtName).subscribe(
      res => {
        if (res.success) {
          this.districts = res.data;
        }
      },
      err => {
        console.log(err);
      });
  }

  searchWards(provinceId: string = null, districtId: string = null, wardName: string = null) {
    this.wardsService.searchWards(provinceId, districtId, wardName).subscribe(
      res => {
        if (res.success) {
          this.wards = res.data;
        }
      },
      err => {
        console.log(err);
      });
  }

  getStreet() {
    this.streetsService.getStreet(this.streetId, this.provinceId, this.districtId, this.wardId).subscribe(
      res => {
        if (res.success) {
          this.street = res.data;
          console.log(this.street);
          console.log(this.street.ward_id);
          this.getProvinces();
          this.searchDistricts(this.street.province_id);
          this.searchWards(null, this.street.district_id);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  updateStreet() {
    this.street.updated_by = this.session.name;

    // console.log(this.street.province_id)
    this.streetsService.updateStreetWard(this.provinceId, this.districtId, this.wardId, this.street).subscribe(
      res => {
        if (res.success) {
          console.log(res.data);
          this.alertService.success('Successfully Updated', true, true);
          this.router.navigateByUrl('/streets');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
