import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../../shared/config/constants';
import { Utils } from '../../../../shared/config/utils';
import { District } from '../../../../shared/models/base-setting/district';
import { DistrictsService } from '../../../../shared/services/districts.service';
import { Province } from '../../../../shared/models/base-setting/province';
import { ProvincesService } from '../../../../shared/services/provinces.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Session } from '../../../../shared/models/auth/session';
import { AuthenticateService } from '../../../../shared/services/authenticate.service';

@Component({
  selector: 'app-district-index',
  templateUrl: './district-index.component.html'
})
export class DistrictIndexComponent implements OnInit {
  totalItems: number;
  currentPage = 1;
  itemsPerPage: number;
  maxSize = Constants.MAXSIZE_PAGINATION;
  districts: District[];
  provinces: Province[];
  districts_name = [];
  selectedProvince: any = '';
  selectedDistrict: any;
  selectedAll = false;
  isChecked = false;
  session: Session;

  constructor(private provincesService: ProvincesService, private alertService: AlertService,
    private districtsService: DistrictsService, private authService: AuthenticateService) {
  }

  ngOnInit() {
    this.authService.session$.subscribe(data => this.session = data);
    this.getProvinces();
    this.getDistricts();
  }

  pageChanged(event: any): void {
    this.selectedAll = false;
    this.isChecked = false;
    this.currentPage = event.page;
    this.getDistricts();
  }

  onSelectedProvince(value) {
    this.selectedDistrict = "";
    this.selectedProvince = value;
    this.selectedAll = false;

    this.searchDistricts(this.selectedProvince, null);
  }

  onSearch() {
    this.selectedAll = false;
    this.searchDistricts(this.selectedProvince, this.selectedDistrict);
  }

  getDistricts() {
    this.districtsService.getDistricts(this.currentPage).subscribe(
      res => {
        if (res.success) {
          this.districts = res.data.data;
          this.totalItems = res.data.total;
          this.itemsPerPage = res.data.per_page;
          this.districts_name = this.districts.map(item => item.district_name);
        }
      },
      err => {
        console.log(err);
      });
  }

  searchDistricts(provinceId: string = null, districtName: string = null) {
    this.districtsService.searchDistricts(this.currentPage, provinceId, districtName).subscribe(
      res => {
        if (res.success) {
          this.districts = res.data;
          this.totalItems = res.data.total;
          this.itemsPerPage = res.data.per_page;
          this.districts_name = this.districts.map(item => item.district_name);
        }
      },
      err => {
        console.log(err);
      });
  }

  deleteDistrict(id: number) {
    let ids = [id];

    this.districtsService.deleteDistrict(this.session.name, ids).subscribe(
      res => {
        if (res.success) {
          this.alertService.success('Successfully Deleted!!!');
          this.getDistricts();
        }
      },
      err => {
        console.log(err);
      });
  }

  deleteAllDistricts() {
    let ids = [];

    this.districts.forEach(i => {
      if (i.checked) {
        ids.push(i.id);
      }
    });

    this.districtsService.deleteDistrict(this.session.name, ids).subscribe(
      res => {
        if (res.success) {
          this.alertService.success('Successfully Deleted!!!');
          this.getDistricts();
        }
      },
      err => {
        console.log(err);
      });
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

  checkAll() {
    if (this.selectedAll) {
      this.districts.forEach(i => {
        i.checked = true;
        this.isChecked = true;
      });
    } else {
      this.districts.forEach(i => {
        i.checked = false;
        this.isChecked = false;
      });
    }

  }

  updateCheck() {
    this.selectedAll = this.districts.every(i => i.checked === true);

    this.isChecked = false;
    this.districts.forEach(i => {
      if (i.checked) { this.isChecked = true; }
    });
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.districts_name.filter(v => Utils.formatLetters(v).indexOf(Utils.formatLetters(term)) > -1).slice(0, 10))
    )
}
