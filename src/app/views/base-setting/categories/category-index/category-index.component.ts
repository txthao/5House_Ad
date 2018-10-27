import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../shared/services/categories.service';
import { AlertService } from '../../../../shared/services/alert.service';
import { AuthenticateService } from '../../../../shared/services/authenticate.service';
import { Category } from '../../../../shared/models/base-setting/category';
import { Constants } from '../../../../shared/config/constants';
import { Session } from '../../../../shared/models/auth/session';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Utils } from '../../../../shared/config/utils';

@Component({
  selector: 'app-category-index',
  templateUrl: './category-index.component.html'
})
export class CategoryIndexComponent implements OnInit {

  totalItems: number;
  currentPage = 1;
  itemsPerPage: number;
  maxSize = Constants.MAXSIZE_PAGINATION;
  // types = [];
  categories: Category[];
  // categories_name = [];
  selectedType: any = "";
  selectedCategory: any = "";
  session: Session;

  constructor(private categoriesService: CategoriesService, private alertService: AlertService,
    private authService: AuthenticateService) { }

  ngOnInit() {
    // this.getTypes();
    this.getCategories();
    // this.searchCategories();
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getCategories();
  }

  // getTypes() {
  //   this.categoriesService.getTypes().subscribe(
  //     res => {
  //       if (res.success) {
  //         this.types = res.data.data;
  //       }
  //     },
  //     err => {
  //       console.log(err);
  //     });
  // }

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

  // searchCategories(typeId: string = null, categoryName: string = null) {
  //   this.categoriesService.searchCategories(typeId, categoryName).subscribe(
  //     res => {
  //       if (res.success) {
  //         this.categories = res.data;
  //         this.totalItems = res.data.total;
  //         this.itemsPerPage = res.data.per_page;
  //         this.categories_name = this.categories.map(item => item.category_name);
  //       }
  //     },
  //     err => {
  //       console.log(err);
  //     });
  // }

  deleteCategory(id: number){
    this.categoriesService.deleteCategory(id).subscribe(
      res => {
        if (res.success) {        
          this.alertService.success('Successfully Deleted!!!');
          // this.searchCategories();
          this.getCategories();
        }
      },
      err => {
        console.log(err);
      });
  }

  // search = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged(),
  //     map(term => term === '' ? []
  //       : this.categories_name.filter(v => Utils.formatLetters(v).indexOf(Utils.formatLetters(term)) > -1).slice(0, 10))
  //   )

}
