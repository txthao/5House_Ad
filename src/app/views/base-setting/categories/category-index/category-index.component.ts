import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../shared/services/categories.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { Category } from '../../../../shared/models/base-setting/category';
import { Constants } from '../../../../shared/config/constants';
import { Session } from '../../../../shared/models/auth/session';

@Component({
  selector: 'app-category-index',
  templateUrl: './category-index.component.html'
})
export class CategoryIndexComponent implements OnInit {

  totalItems: number;
  currentPage = 1;
  itemsPerPage: number;
  maxSize = Constants.MAXSIZE_PAGINATION;
  categories: Category[];
  selectedType: any = "";
  selectedCategory: any = "";
  session: Session;

  constructor(private categoriesService: CategoriesService, private alertService: AlertService) { }

  ngOnInit() {
    this.getCategories();
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getCategories();
  }

  getCategories() {
      this.categoriesService.getCategories(this.currentPage).subscribe(
      res => {
        if (res.success) {
          this.categories = res.data.data;
          this.totalItems = res.data.total;
          this.itemsPerPage = res.data.per_page;
        }
      },
      err => {
        console.log(err);
      });
  }

  deleteCategory(id: number){
    this.categoriesService.deleteCategory(id).subscribe(
      res => {
        if (res.success) {        
          this.alertService.success('Successfully Deleted!!!');
          this.getCategories();
        }
      },
      err => {
        console.log(err);
      });
  }

}
