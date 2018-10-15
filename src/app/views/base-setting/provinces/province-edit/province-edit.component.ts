import { Component, OnInit } from '@angular/core';
import { Province } from '../../../../shared/models/base-setting/province';
import { ProvincesService } from '../../../../shared/services/provinces.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-province-edit',
  templateUrl: './province-edit.component.html'
})
export class ProvinceEditComponent implements OnInit {

  provinceId = this.activedRoute.snapshot.params['id'];
  province: Province = new Province();
  constructor(private provincesService: ProvincesService, private activedRoute: ActivatedRoute, private router: Router,
              private alertService: AlertService) { }

  ngOnInit() {
    this.getProvince();
  }

  getProvince() {
    this.provincesService.getProvince(this.provinceId).subscribe(
      res => {
        if (res.success) {
          this.province = res.data;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  updateProvince() {
    this.provincesService.updateProvince(this.province).subscribe(
      res => {
        if (res.success) {
          this.alertService.success('Successfully Updated', true, true);
          this.router.navigateByUrl('/provinces');
        }
      },
      err => {
        console.log(err);
      }
    );
  }


}
