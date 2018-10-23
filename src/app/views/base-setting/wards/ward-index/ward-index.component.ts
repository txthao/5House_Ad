import { Component, OnInit } from '@angular/core';
import { WardsService } from '../../../../shared/services/wards.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { AuthenticateService } from '../../../../shared/services/authenticate.service';
import { Session } from '../../../../shared/models/auth/session';
import { Constants } from '../../../../shared/config/constants';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Wards } from '../../../../shared/models/base-setting/wards';
import { Utils } from '../../../../shared/config/utils';
import { DistrictsService } from '../../../../shared/services/districts.service';
import { District } from '../../../../shared/models/base-setting/district';
import { Province } from '../../../../shared/models/base-setting/province';
import { ProvincesService } from '../../../../shared/services/provinces.service';

@Component({
  selector: 'app-ward-index',
  templateUrl: './ward-index.component.html'
})
export class WardIndexComponent implements OnInit {

  totalItems: number;
  currentPage = 1;
  itemsPerPage: number;
  maxSize = Constants.MAXSIZE_PAGINATION;
  provinces: Province[];
  districts: District[];
  wards: Wards[];
  wards_name = [];
  selectedProvince: any = '';
  selectedDistrict: any = '';
  selectedWard: any;
  selectedAll = false;
  isChecked = false;
  session: Session;

  constructor(private wardsService: WardsService, private districtsService: DistrictsService, private provincesService: ProvincesService,
    private alertService: AlertService, private authService: AuthenticateService) {
  }

  ngOnInit() {
    this.authService.session$.subscribe(data => this.session = data);
    this.getProvinces();
    this.getWards();

    console.log(this.isChecked);
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getWards();
  }

  onSelectedProvince(value) {
    this.selectedDistrict = '';
    this.selectedWard = '';
    this.selectedProvince = value;
    this.selectedAll = false;

    this.searchDistricts(this.selectedProvince, null);
    this.searchWards(this.selectedProvince, null, null);
  }

  onSelectedDistrict(value) {
    this.selectedDistrict = value;
    this.selectedWard = '';
    this.selectedAll = false;
    
    this.searchWards(this.selectedProvince, this.selectedDistrict, null);
  }

  getWards() {
    this.wardsService.getWards(this.currentPage).subscribe(
      res => {
        if (res.success) {
          this.wards = res.data.data;
          this.totalItems = res.data.total;
          this.itemsPerPage = res.data.per_page;
          this.wards_name = this.wards.map(item => item.ward_name);
        }
      },
      err => {
        console.log(err);
      });
  }

  searchWards(provinceId: string = null, districtId: string = null, wardsName: string = null) {
    this.wardsService.searchWards(provinceId, districtId, wardsName).subscribe(
      res => {
        if (res.success) {
          this.wards = res.data;
          this.totalItems = res.data.total;
          this.itemsPerPage = res.data.per_page;
          this.wards_name = this.wards.map(item => item.ward_name);
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

  deleteWard(id: number) {
    let ids = [id];

    this.wardsService.deleteWard(this.session.name, ids).subscribe(
      res => {
        if (res.success) {        
          this.alertService.success('Successfully Deleted!!!');
          this.getWards();
        }
      },
      err => {
        console.log(err);
      });
  }

  deleteAllWards() {
    let ids = [];

    this.wards.forEach(i => {
      if (i.checked) {
        ids.push(i.id);
      }
    });

    console.log(ids);

    this.wardsService.deleteWard(this.session.name, ids).subscribe(
      res => {
        if (res.success) {
          this.alertService.success('Successfully Deleted!!!');
          this.getWards();
        }
      },
      err => {
        console.log(err);
      });
  }

  checkAll() {
    console.log(this.selectedAll);

    if (this.selectedAll) {
      this.wards.forEach(i => {
        i.checked = true;
        this.isChecked = true;
      });
    } else {
      this.wards.forEach(i => {
        i.checked = false;
        this.isChecked = false;
      });
    }
    
  }

  updateCheck() {
    this.selectedAll = this.wards.every(i => i.checked === true);
    
    this.isChecked = false;
    this.wards.forEach(i => {
      if (i.checked) {this.isChecked = true;}
    });

    console.log(this.isChecked);
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.wards_name.filter(v => Utils.formatLetters(v).indexOf(Utils.formatLetters(term)) > -1).slice(0, 10))
    )

}
