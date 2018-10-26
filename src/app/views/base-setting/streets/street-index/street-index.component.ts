import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../../shared/config/constants';
import { Province } from '../../../../shared/models/base-setting/province';
import { District } from '../../../../shared/models/base-setting/district';
import { Wards } from '../../../../shared/models/base-setting/wards';
import { Street } from '../../../../shared/models/base-setting/street';
import { Session } from '../../../../shared/models/auth/session';
import { WardsService } from '../../../../shared/services/wards.service';
import { DistrictsService } from '../../../../shared/services/districts.service';
import { AuthenticateService } from '../../../../shared/services/authenticate.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { ProvincesService } from '../../../../shared/services/provinces.service';
import { StreetsService } from '../../../../shared/services/streets.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Utils } from '../../../../shared/config/utils';

@Component({
  selector: 'app-street-index',
  templateUrl: './street-index.component.html'
})
export class StreetIndexComponent implements OnInit {

  totalItems: number;
  currentPage = 1;
  itemsPerPage: number;
  maxSize = Constants.MAXSIZE_PAGINATION;
  provinces: Province[];
  districts: District[];
  wards: Wards[];
  streets: Street[];
  streets_name = [];
  selectedProvince: any = '';
  selectedDistrict: any = '';
  selectedWard: any = '';
  selectedStreet: any;
  selectedAll = false;
  isChecked = false;
  session: Session;

  constructor(private streetsService: StreetsService, private wardsService: WardsService,
    private districtsService: DistrictsService, private provincesService: ProvincesService,
    private alertService: AlertService, private authService: AuthenticateService) {
  }

  ngOnInit() {
    this.authService.session$.subscribe(data => this.session = data);
    this.getProvinces();
    this.searchDistricts(this.selectedProvince, null);
    this.searchWards();
    this.searchStreets();

    // console.log(this.isChecked);
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.searchStreets();
  }

  onSearch() {
    this.selectedAll = false;
    this.searchStreets(this.selectedProvince, this.selectedDistrict, this.selectedWard, this.selectedStreet);
  }

  onSelectedProvince(value) {
    this.selectedDistrict = '';
    this.selectedWard = '';
    this.selectedStreet = '';
    this.selectedProvince = value;
    this.selectedAll = false;

    this.searchDistricts(this.selectedProvince);
    this.searchWards(this.selectedProvince);
    //search street
    this.searchStreets(this.selectedProvince);
  }

  onSelectedDistrict(value) {
    this.selectedDistrict = value;
    this.selectedWard = '';
    this.selectedStreet = '';
    this.selectedAll = false;

    this.searchWards(this.selectedProvince, this.selectedDistrict);
    this.searchStreets(this.selectedProvince, this.selectedDistrict);
  }

  onSelectedWard(value) {
    this.selectedWard = value;
    this.selectedStreet = '';
    this.selectedAll = false;

    //search street
    this.searchStreets(this.selectedProvince, this.selectedDistrict, this.selectedWard);
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

  searchStreets(provinceId: string = null, districtId: string = null,
    wardId: string = null, streetName: string = null) {

    this.isChecked = false;

    this.streetsService.searchStreets(provinceId, districtId, wardId, streetName).subscribe(
      res => {
        if (res.success) {
          this.streets = res.data;
          // console.log(this.streets);
          this.totalItems = res.data.total;
          this.itemsPerPage = res.data.per_page;
          this.streets_name = this.streets.map(item => item.street_name);
        }
      },
      err => {
        console.log(err);
      });

  }

  deleteStreet(id: number) {
    let ids = [id];

    this.streetsService.deleteStreet(this.session.name, ids).subscribe(
      res => {
        if (res.success) {
          this.alertService.success('Successfully Deleted!!!');
          this.searchStreets();
        }
      },
      err => {
        console.log(err);
      });
  }

  deleteAllStreets() {
    let ids = [];

    this.streets.forEach(i => {
      if (i.checked) {
        ids.push(i.id);
      }
    });

    console.log(ids);

    this.streetsService.deleteStreet(this.session.name, ids).subscribe(
      res => {
        if (res.success) {
          this.alertService.success('Successfully Deleted!!!');
          this.searchStreets();
        }
      },
      err => {
        console.log(err);
      });
  }

  checkAll() {
    console.log(this.selectedAll);

    if (this.selectedAll) {
      this.streets.forEach(i => {
        i.checked = true;
        this.isChecked = true;
      });
    } else {
      this.streets.forEach(i => {
        i.checked = false;
        this.isChecked = false;
      });
    }

  }

  updateCheck() {
    this.selectedAll = this.streets.every(i => i.checked === true);

    this.isChecked = false;
    this.streets.forEach(i => {
      if (i.checked) { this.isChecked = true; }
    });

    console.log(this.isChecked);
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.streets_name.filter(v => Utils.formatLetters(v).indexOf(Utils.formatLetters(term)) > -1).slice(0, 10))
    )

}
