import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ProvincesService } from '../../../../shared/services/provinces.service';
import { Province } from '../../../../shared/models/base-setting/province';
import { Router } from '@angular/router';
import { AlertService } from '../../../../shared/services/alert.service';
import { AuthenticateService } from '../../../../shared/services/authenticate.service';
import { Session } from '../../../../shared/models/auth/session';

@Component({
  selector: 'app-province-create',
  templateUrl: './province-create.component.html'
})
export class ProvinceCreateComponent implements OnInit {

  provinces = [];
  session: Session;
  constructor(private provincesService: ProvincesService, private router: Router, private alertService: AlertService,
    private authService: AuthenticateService) { }

  ngOnInit() {
    this.authService.session$.subscribe(data => this.session = data);
    this.newItem();

  }

  newItem() {
    let province = new Province();
    province.index = this.provinces.length;
    province.created_by = this.session.name;
    this.provinces.push(province);
  }

  removeItem(index) {
    this.provinces.splice(index, 1);
  }

  createProvince() {
    this.provincesService.createProvince(this.provinces).subscribe(
      res => {
        if (res.success) {
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
