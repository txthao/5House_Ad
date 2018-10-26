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
  provinces: Province[];
  districts: District[];
  wards: Wards[];
  provinceId: number;
  districtId: number;
  session: Session;

  constructor(private streetsService: StreetsService, private wardsService: WardsService, private districtsService: DistrictsService, private provincesService: ProvincesService,
    private activedRoute: ActivatedRoute, private router: Router,
    private alertService: AlertService, private authService: AuthenticateService) { }

  ngOnInit() {
    this.authService.session$.subscribe(data => this.session = data);

    this.getStreet();

    // this.getProvinces();
    // this.searchDistricts();
    // this.searchWards();
  }

  onSelectedProvince() {
    this.searchDistricts(this.street.province_id);
    this.street.district_id = "";
    this.street.ward_id = "";
  }

  onSelectedDistrict(value) {
    this.searchWards(null, this.street.district_id);
    this.street.ward_id = "";
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
    this.streetsService.getStreet(this.streetId).subscribe(
      res => {
        if (res.success) {
          this.street = res.data;
          console.log(this.street);
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
    this.streetsService.updateStreet(this.street).subscribe(
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
