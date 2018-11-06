import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConstants } from '../config/api-constants';
import { ApiResult } from '../models/api-result';
import { Post } from '../models/posts/post';

@Injectable()
export class PostsService extends APIService {

    constructor(private http: HttpClient) {
        super(http);
    }

    public getPosts(page: number = null) {
        let params = '';
        if (page) {
            params += `?page=${page}`;
        }
        return super.apiGet<ApiResult>(ApiConstants.ADMIN_API + '/posts' + params);

    }

    public getPost(id: number) {
        return super.apiGet<ApiResult>(ApiConstants.POST_API + '/details/' + id);

    }

    public createPost(post: Post) {
        return super.apiPost<ApiResult>(ApiConstants.POST_API + '/create', post);
    }

    public updatePost(post: Post) {
        let data = {
            // "Post_name": Post.Post_name,
            // "updated_by": Post.updated_by
        };
        return super.apiPost<ApiResult>(ApiConstants.POST_API + '/update/' + post.id, data);
    }

    public deletePost(postId: number) {
        return super.apiPost<ApiResult>(ApiConstants.POST_API + '/delete/' + postId);
    }

}
