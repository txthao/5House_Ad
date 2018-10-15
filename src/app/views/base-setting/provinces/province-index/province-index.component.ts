import { Component, OnInit } from '@angular/core';
import { Province } from '../../../../shared/models/base-setting/province';
import { ProvincesService } from '../../../../shared/services/provinces.service';
import { Constants } from '../../../../shared/config/constants';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-province-index',
  templateUrl: './province-index.component.html'
})
export class ProvinceIndexComponent implements OnInit {

  totalItems: number;
  currentPage: number = 1;
  itemsPerPage: number;
  maxSize: number = Constants.MAXSIZE_PAGINATION;
  provinces: Province[];

  constructor(private provincesService: ProvincesService,  private alertService: AlertService) { }

  ngOnInit() {
    this.getProvinces();
  }

 
  pageChanged(event: any): void {
    this.currentPage= event.page;
    this.getProvinces();
  }

  getProvinces(){
    this.provincesService.getProvinces(this.currentPage).subscribe(
      res => {
        if (res.success) {
          this.provinces = res.data.data;
          this.totalItems = res.data.total;
          this.itemsPerPage = res.data.per_page;
          console.log(this.provinces);
        }
      },
      err => {
        console.log(err);
      });
  }

  deleteProvince(id: number){
    this.provincesService.deleteProvince(id).subscribe(
      res => {
        if (res.success) {        
          this.alertService.success('Successfully Deleted!!!');
          this.getProvinces();
        }
      },
      err => {
        console.log(err);
      });
  }

 
}
