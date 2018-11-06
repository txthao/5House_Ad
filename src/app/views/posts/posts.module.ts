import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { PostsRoutingModule } from './posts.routing';

import { PostsComponent } from './posts.component';
import { PostIndexComponent } from './post-index/post-index.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostCreateComponent } from './post-create/post-create.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PaginationModule,
    PostsRoutingModule,
    
  ],
  declarations: [PostsComponent, PostIndexComponent, PostEditComponent, PostCreateComponent]
})
export class PostsModule { }
