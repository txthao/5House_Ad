import { Component, OnInit } from '@angular/core';
import { Session } from '../../../../shared/models/auth/session';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../../../shared/services/authenticate.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { StreetsService } from '../../../../shared/services/streets.service';
import { Street } from '../../../../shared/models/base-setting/street';

@Component({
  selector: 'app-street-create',
  templateUrl: './street-create.component.html'
})
export class StreetCreateComponent implements OnInit {

  streets = [];
  session: Session;
  constructor(private streetsService: StreetsService, private router: Router, private alertService: AlertService,
    private authService: AuthenticateService) { }

  ngOnInit() {
    this.authService.session$.subscribe(data => this.session = data);
    this.newItem();

  }

  newItem() {
    let street = new Street();
    street.index = this.streets.length;
    street.created_by = this.session.name;
    this.streets.push(street);
  }

  removeItem(index) {
    this.streets.splice(index, 1);
  }

  createStreets() {
    this.streetsService.createStreet(this.session.name, this.streets).subscribe(
      res => {
        if (res.success) {
          this.alertService.success('Successfully Created', true, true);
          this.router.navigateByUrl('/streets');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
