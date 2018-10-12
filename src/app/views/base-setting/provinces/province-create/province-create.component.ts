import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProvincesService } from '../../../../shared/services/provinces.service';
import { Province } from '../../../../shared/models/base-setting/province';
import { Router } from '@angular/router';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-province-create',
  templateUrl: './province-create.component.html'
})
export class ProvinceCreateComponent implements OnInit {
  createForm: FormGroup;
  province: Province = new Province();
  constructor(private provincesService: ProvincesService, private router: Router,  private alertService: AlertService) { }

  ngOnInit() {
  }

  createProvince() {
    this.provincesService.createProvince(this.province).subscribe(
      res => {
        if (res.success) {
          this.alertService.success('Successfully Created', true);
          this.router.navigateByUrl('/provinces');
        } 
      },
      err => {
        console.log(err);
      }
    );
  }

}
