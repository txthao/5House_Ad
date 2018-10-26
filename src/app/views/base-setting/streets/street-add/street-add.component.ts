import { Component, OnInit } from '@angular/core';
import { Province } from '../../../../shared/models/base-setting/province';
import { District } from '../../../../shared/models/base-setting/district';
import { Wards } from '../../../../shared/models/base-setting/wards';
import { StreetsService } from '../../../../shared/services/streets.service';
import { WardsService } from '../../../../shared/services/wards.service';
import { DistrictsService } from '../../../../shared/services/districts.service';
import { ProvincesService } from '../../../../shared/services/provinces.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../../shared/services/alert.service';
import { AuthenticateService } from '../../../../shared/services/authenticate.service';
import { Street } from '../../../../shared/models/base-setting/street';
import { Session } from '../../../../shared/models/auth/session';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Utils } from '../../../../shared/config/utils';

@Component({
  selector: 'app-street-add',
  templateUrl: './street-add.component.html'
})
export class StreetAddComponent implements OnInit {

  provinces: Province[];
  districts: District[];
  wards: Wards[];
  streets = [];
  streetsAvailable = [];
  selectedProvince: any = "";
  selectedDistrict: any = "";
  selectedWard: any = "";
  session: Session;

  constructor(private streetsService: StreetsService, private wardsService: WardsService,
    private districtsService: DistrictsService, private provincesService: ProvincesService,
    private router: Router, private alertService: AlertService,
    private authService: AuthenticateService) { }

  ngOnInit() {
    this.authService.session$.subscribe(data => this.session = data);
    this.getProvinces();
    this.getAllStreets();
  }

  newItem() {
    let street = new Street();
    street.index = this.streets.length;
    street.created_by = this.session.name;
    this.streets.push(street);
  }

  removeItem(index) {
    this.streets.splice(index, 1);
  }

  onSelectedProvince() {
    this.selectedDistrict = "";
    this.searchDistricts(this.selectedProvince);
    if (this.streets.length === 0) {
      this.newItem();
    }
  }

  onSelectedDistrict() {
    this.selectedWard = "";
    this.wards = [];
    if (this.selectedDistrict !== "") {
      this.searchWards(null, this.selectedDistrict);
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

  getAllStreets() {
    this.streetsService.getStreets().subscribe(
      res => {
        if (res.success) {
          this.streetsAvailable = res.data.data.map(item => item.street_name);
        }
      },
      err => {
        console.log(err);
      });
  }

  addStreets() {
    this.streetsService.addStreetToState(this.session.name, this.selectedProvince,
      this.selectedDistrict, this.selectedWard, this.streets).subscribe(
        res => {
          if (res.success) {
            this.alertService.success('Successfully Added', true, true);
            this.router.navigateByUrl('/streets');
          }
        },
        err => {
          console.log(err);
        });
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.streetsAvailable.filter(v => Utils.formatLetters(v).indexOf(Utils.formatLetters(term)) > -1).slice(0, 10))
    )

}
