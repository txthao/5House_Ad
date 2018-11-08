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
import { Router } from '@angular/router';

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
  checkedAll = false;
  isChecked = false;
  session: Session;

  constructor(private streetsService: StreetsService, private wardsService: WardsService,
    private districtsService: DistrictsService, private provincesService: ProvincesService,
    private alertService: AlertService, private authService: AuthenticateService,
    private router: Router) { }

  ngOnInit() {
    this.authService.session$.subscribe(data => this.session = data);
    this.getProvinces();
    this.searchDistricts(this.selectedProvince, null);
    this.searchWards();
    this.searchStreets();
  }

  pageChanged(event: any): void {
    this.checkedAll = false;
    this.isChecked = false;
    this.currentPage = event.page;
    this.searchStreets();
  }

  onSearch() {
    this.checkedAll = false;
    this.searchStreets(this.selectedProvince, this.selectedDistrict, this.selectedWard, this.selectedStreet);
  }

  onSelectedProvince(value) {
    this.selectedDistrict = '';
    this.selectedWard = '';
    this.selectedStreet = '';
    this.selectedProvince = value;
    this.checkedAll = false;

    this.searchDistricts(this.selectedProvince);
    this.searchWards(this.selectedProvince);
    //search street
    this.searchStreets(this.selectedProvince);
  }

  onSelectedDistrict(value) {
    this.selectedDistrict = value;
    this.selectedWard = '';
    this.selectedStreet = '';
    this.checkedAll = false;

    this.searchWards(this.selectedProvince, this.selectedDistrict);
    this.searchStreets(this.selectedProvince, this.selectedDistrict);
  }

  onSelectedWard(value) {
    this.selectedWard = value;
    this.selectedStreet = '';
    this.checkedAll = false;

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

  searchWards(provinceId: string = null, districtId: string = null, wardName: string = null) {
    this.wardsService.searchWards(null, provinceId, districtId, wardName).subscribe(
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

    this.streetsService.searchStreets(this.currentPage, provinceId, districtId, wardId, streetName).subscribe(
      res => {
        if (res.success) {
          this.streets = res.data.data;
          this.totalItems = res.data.total;
          this.itemsPerPage = res.data.per_page;
          this.streets_name = this.streets.map(item => item.street_name);

          //Remove the duplicate item in array
          this.streets_name = this.streets_name.filter((name, i, a) => i === a.indexOf(name));
        }
      },
      err => {
        console.log(err);
      });

  }

  deleteStreet(street: Street) {
    let streets = [street]

    this.streetsService.deleteStreetWard(streets).subscribe(
      res => {
        if (res.success) {
          this.alertService.success('Successfully Deleted The Street From State!!!');
          this.searchStreets();
        }
      },
      err => {
        console.log(err);
      });
  }

  deleteAllStreets() {
    let streets = [];

    this.streets.forEach(i => {
      if (i.checked) {
        streets.push(i);
      }
    });

    if (streets.length > 0) {
      this.streetsService.deleteStreetWard(streets).subscribe(
        res => {
          if (res.success) {
            this.alertService.success('Successfully Deleted The Street From State!!!');
            this.searchStreets();
          }
        },
        err => {
          console.log(err);
        });
    }

  }

  checkAll() {
    if (this.checkedAll) {
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
    this.checkedAll = this.streets.every(i => i.checked === true);

    this.isChecked = false;
    this.streets.forEach(i => {
      if (i.checked) { this.isChecked = true; }
    });
  }

  goDetailStreet(street) {
    this.router.navigate(['/streets/' + street.id], { queryParams: { province_id: street.province_id, district_id: street.district_id, ward_id: street.ward_id } });
  }


  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.streets_name.filter(v => Utils.formatLetters(v).indexOf(Utils.formatLetters(term)) > -1).slice(0, 10))
    )

}
