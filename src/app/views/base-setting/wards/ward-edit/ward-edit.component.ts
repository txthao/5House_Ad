import { Component, OnInit } from '@angular/core';
import { Session } from '../../../../shared/models/auth/session';
import { District } from '../../../../shared/models/base-setting/district';
import { Province } from '../../../../shared/models/base-setting/province';
import { Wards } from '../../../../shared/models/base-setting/wards';
import { DistrictsService } from '../../../../shared/services/districts.service';
import { ProvincesService } from '../../../../shared/services/provinces.service';
import { AuthenticateService } from '../../../../shared/services/authenticate.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WardsService } from '../../../../shared/services/wards.service';

@Component({
  selector: 'app-ward-edit',
  templateUrl: './ward-edit.component.html'
})
export class WardEditComponent implements OnInit {

  ward: Wards = new Wards();
  wardId = this.activedRoute.snapshot.params['id'];
  provinces: Province[];
  districts: District[];
  provinceId: number;
  session: Session;

  constructor(private wardsService: WardsService, private districtsService: DistrictsService, private provincesService: ProvincesService,
    private activedRoute: ActivatedRoute, private router: Router,
    private alertService: AlertService, private authService: AuthenticateService) { }

  ngOnInit() {
    this.authService.session$.subscribe(data => this.session = data);
    
    this.getProvinces();
    this.searchDistricts();
    this.getWard();
  }

  onSelectedProvince() {
    this.searchDistricts(this.ward.province_id, null);
    this.ward.district_id = "";
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

  getWard() {
    this.wardsService.getWard(this.wardId).subscribe(
      res => {
        if (res.success) {
          this.ward = res.data;
          console.log(this.ward);
          this.getProvinces();
          this.searchDistricts(this.ward.province_id, null);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  searchDistricts(provinceId: string = null, districtName: string = null) {
    this.districtsService.searchDistricts(null, provinceId, districtName).subscribe(
      res => {
        if (res.success) {
          this.districts = res.data;
          console.log(this.districts);
        }
      },
      err => {
        console.log(err);
      });
  }

  updateWard() {
    this.ward.updated_by = this.session.name;
    this.wardsService.updateWard(this.ward).subscribe(
      res => {
        if (res.success) {
          console.log(res.data);
          this.alertService.success('Successfully Updated', true, true);
          this.router.navigateByUrl('/wards');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
