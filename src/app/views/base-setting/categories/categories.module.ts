import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../../shared/services/categories.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryIndexComponent } from './category-index/category-index.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesRoutingModule } from './categories.routing';
import { CategoriesComponent } from './categories.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CategoriesRoutingModule,
    PaginationModule,
    NgbModule
  ],
  providers: [CategoriesService],
  declarations: [CategoriesComponent, CategoryIndexComponent, CategoryEditComponent, CategoryCreateComponent]
})
export class CategoriesModule { }
