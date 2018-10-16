import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {DistrictsService} from '../../../../shared/services/districts.service';
import {ProvincesService} from '../../../../shared/services/provinces.service';
import { District } from '../../../../shared/models/base-setting/district';
import { Province } from '../../../../shared/models/base-setting/province';
import { AlertService } from '../../../../shared/services/alert.service';
import { AuthenticateService } from '../../../../shared/services/authenticate.service';
import { Session } from '../../../../shared/models/auth/session';

@Component({
  selector: 'app-district-edit',
  templateUrl: './district-edit.component.html'
})
export class DistrictEditComponent implements OnInit {

  district: District = new District();
  districtId = this.activedRoute.snapshot.params['id'];
  provinces: Province[];
  provinceId: number;
  session: Session;

  constructor(private districtsService: DistrictsService, private provincesService: ProvincesService, private activedRoute: ActivatedRoute, private router: Router,
    private alertService: AlertService,  private authService: AuthenticateService) { }

  ngOnInit() {
    this.authService.session$.subscribe(data => this.session = data);
    this.getProvinces();
    this.getDistrict();
  }

  getDistrict() {
    this.districtsService.getDistrict(this.districtId).subscribe(
      res => {
        if (res.success) {
          this.district = res.data;
          console.log(res.data.province_id);
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

  updateDistrict() {
    this.district.updated_by = this.session.name;
    this.districtsService.updateDictrict(this.district).subscribe(
      res => {
        if (res.success) {
          console.log(res.data);
          this.alertService.success('Successfully Updated', true, true);
          this.router.navigateByUrl('/districts');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
