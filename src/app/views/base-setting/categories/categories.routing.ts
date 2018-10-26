import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService  as AuthGuard  } from '../../../shared/services/auth-guard.service';
import { CategoryIndexComponent } from './category-index/category-index.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoriesComponent } from './categories.component';

const routes: Routes = [{
  path: '',
  component: CategoriesComponent,
  data: { title: 'Categories' },
  children: [
    {
      path: '',
      component: CategoryIndexComponent,
      data: { title: '' },
      canActivate: [AuthGuard]
    },
    {
      path: 'create',
      component: CategoryCreateComponent,
      data: { title: 'Create Category' },
      canActivate: [AuthGuard]
    },
    {
      path: ':id',
      component: CategoryEditComponent,
      data: { title: 'Edit Category' },
      canActivate: [AuthGuard]
    }
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
