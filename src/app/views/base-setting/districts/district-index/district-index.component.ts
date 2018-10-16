import {Component, OnInit} from '@angular/core';
import {Constants} from '../../../../shared/config/constants';
import {Utils} from '../../../../shared/config/utils';
import {District} from '../../../../shared/models/base-setting/district';
import {DistrictsService} from '../../../../shared/services/districts.service';
import {Province} from '../../../../shared/models/base-setting/province';
import {ProvincesService} from '../../../../shared/services/provinces.service';
import {AlertService} from '../../../../shared/services/alert.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

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
  districtsFilter: District[];
  provinces: Province[];
  districts_name = [];
  abc = [];
  selectedProvince: any = "";
  selectedDistrict: any;


  constructor(private provincesService: ProvincesService, private alertService: AlertService, private districtsService: DistrictsService) {
  }

  ngOnInit() {
    this.getProvinces();
    this.getDistricts();
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getDistricts();
  }

  onSelectedProvince(value) {
    // console.log(value);
    this.selectedDistrict = "";
    this.selectedProvince = value;

    this.searchDistricts(this.selectedProvince, null);
  }

  onSearch() {
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

  // searchDistrictsForInput(provinceId: string = null, districtName: string = null) {
  //   this.districtsService.searchDistricts(provinceId, districtName).subscribe(
  //     res => {
  //       if (res.success) {
  //         this.districtsFilter = res.data;
  //         this.totalItems = res.data.total;
  //         this.itemsPerPage = res.data.per_page;
  //         this.districts_name = this.districtsFilter.map(item => item.district_name);
  //       }
  //     },
  //     err => {
  //       console.log(err);
  //     });
  // }

  searchDistricts(provinceId: string = null, districtName: string = null) {
    // console.log(provinceId);
    // console.log(districtName);
    this.districtsService.searchDistricts(provinceId, districtName).subscribe(
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

  // deleteDistrict(id: number) {
  //   this.districtsService.deleteDistrict(id).subscribe(
  //     res => {
  //       if (res.success) {
  //         this.alertService.success('Successfully Deleted!!!');
  //         this.getDistricts();
  //       }
  //     },
  //     err => {
  //       console.log(err);
  //     });
  // }

  getProvinces() {
    this.provincesService.getProvinces(this.currentPage).subscribe(
      res => {
        if (res.success) {
          this.provinces = res.data.data;
          this.totalItems = res.data.total;
          this.itemsPerPage = res.data.per_page;
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
        : this.districts_name.filter(v => Utils.formatLetters(v).indexOf(Utils.formatLetters(term)) > -1).slice(0, 10))
    )
}
