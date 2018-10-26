import { Component, OnInit } from '@angular/core';
import { Session } from '../../../../shared/models/auth/session';
import { Router } from '@angular/router';
import { AlertService } from '../../../../shared/services/alert.service';
import { AuthenticateService } from '../../../../shared/services/authenticate.service';
import { CategoriesService } from '../../../../shared/services/categories.service';
import { Type } from '@angular/compiler/src/core';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html'
})
export class CategoryCreateComponent implements OnInit {

  types = [];
  typeId: any;
  showInputCategory = false;
  category_name: string;
  session: Session;

  constructor(private categoriesService: CategoriesService, private router: Router, private alertService: AlertService,
    private authService: AuthenticateService) { }

  ngOnInit() {
    this.authService.session$.subscribe(data => this.session = data);
    this.getTypes();
  }

  onSelectedType() {
    this.showInputCategory = true;
  }

  createCategory() {
    this.categoriesService.createCategory(this.session.name, this.typeId, this.category_name).subscribe(
      res => {
        if (res.success) {
          this.alertService.success('Successfully Created', true, true);
          this.router.navigateByUrl('/categories');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getTypes() {
    this.categoriesService.getTypes().subscribe(
      res => {
        if (res.success) {
          this.types = res.data.data;
        }
      },
      err => {
        console.log(err);
      });
  }

}
