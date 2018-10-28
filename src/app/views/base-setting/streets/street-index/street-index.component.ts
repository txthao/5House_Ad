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
  selectedAll = false;
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

    // console.log(this.isChecked);
  }

  pageChanged(event: any): void {
    this.selectedAll = false;
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

    this.streetsService.searchStreets(this.currentPage, provinceId, districtId, wardId, streetName).subscribe(
      res => {
        if (res.success) {
          this.streets = res.data.data;
          this.totalItems = res.data.total;
          this.itemsPerPage = res.data.per_page;
          this.streets_name = this.streets.map(item => item.street_name);

          //Remove the duplicate item in array
          for (var i = 0; i < this.streets_name.length - 1; i++) {
            for (var j = i + 1; j < this.streets_name.length; j++) {
              if (this.streets_name[i] === this.streets_name[j]) {
                this.streets_name[j] = this.streets_name[j + 1]
                this.streets_name.length--;
                i--;
              }
            }
          }
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

    console.log(streets);

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

  goDetailStreet(street) {
    console.log(street)
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
