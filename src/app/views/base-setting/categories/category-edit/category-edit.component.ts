import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../shared/services/categories.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { AuthenticateService } from '../../../../shared/services/authenticate.service';
import { Session } from '../../../../shared/models/auth/session';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../../../../shared/models/base-setting/category';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html'
})
export class CategoryEditComponent implements OnInit {

  types = [];
  categoryId = this.activedRoute.snapshot.params['id'];
  category: Category = new Category();
  session: Session;

  constructor(private categoriesService: CategoriesService, private alertService: AlertService, 
    private authService: AuthenticateService, private router: Router, private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.authService.session$.subscribe(data => this.session = data);
    this.getTypes();
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

  getCategory() {
    this.categoriesService.getCategory(this.categoryId).subscribe(
      res => {
        if (res.success) {
          this.category = res.data;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  updateCategory() {
    this.categoriesService.updateCategory(this.session.name, this.category).subscribe(
      res => {
        if (res.success) {
          console.log(res.data);
          this.alertService.success('Successfully Updated', true, true);
          this.router.navigateByUrl('/categories');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
