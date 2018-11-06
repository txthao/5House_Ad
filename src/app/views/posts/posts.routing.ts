import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService  as AuthGuard  } from '../../shared/services/auth-guard.service';

import { PostIndexComponent } from './post-index/post-index.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostsComponent } from './posts.component';


const routes: Routes = [{
  path: '',
  component: PostsComponent,
  data: { title: 'Posts' },
  children: [
    {
      path: '',
      component: PostIndexComponent,
      data: { title: '' },
      canActivate: [AuthGuard]
    },
    {
      path: 'create',
      component: PostCreateComponent,
      data: { title: 'Create Post' },
      canActivate: [AuthGuard]
    },
    {
      path: ':id',
      component: PostEditComponent,
      data: { title: 'Edit Post' },
      canActivate: [AuthGuard]
    }
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
