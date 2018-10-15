import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ProvincesService } from '../../../../shared/services/provinces.service';
import { Province } from '../../../../shared/models/base-setting/province';
import { Router } from '@angular/router';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-province-create',
  templateUrl: './province-create.component.html'
})
export class ProvinceCreateComponent implements OnInit {
  
  provinces = [];
  constructor(private provincesService: ProvincesService, private router: Router,  private alertService: AlertService) { }

  ngOnInit() {
    this.newItem();

  }

  newItem(){
    let province = new Province();
    province.index = this.provinces.length;
    province.created_by = "ThaoPT";
   // province.province_name = 'a';
    this.provinces.push(province);
    console.log(this.provinces.length);
  }

  removeItem(index){
    this.provinces.splice(index,1);
  }

  createProvince() {
    console.log(this.provinces);
    this.provincesService.createProvince(this.provinces).subscribe(
      res => {
        if (res.success) {
          console.log(res);
          this.alertService.success('Successfully Created', true, true);
          this.router.navigateByUrl('/provinces');
        } 
      },
      err => {
        console.log(err);
      }
    );
  }

}
