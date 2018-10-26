import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConstants } from '../config/api-constants';
import { ApiResult } from '../models/api-result';
import { Category } from '../models/base-setting/category';

@Injectable()
export class CategoriesService extends APIService {

    constructor(private http: HttpClient) {
        super(http);
    }

    public getTypes() {
        return super.apiGet<ApiResult>(ApiConstants.ADMIN_API + '/types');
    }

    public getCategories(page: number = null) {
        let params = '';
        if (page) {
            params += `?page=${page}`;
        }
        return super.apiGet<ApiResult>(ApiConstants.ADMIN_API + '/categories' + params);

    }

    public getCategory(id: number) {
        return super.apiGet<ApiResult>(ApiConstants.CATEGORY_API + '/details/' + id);

    }

    // public searchCategories(typeId: string = null, categoryName: string = null) {

    //     let params = '';

    //     if (typeId) {
    //         params = "?type_id=" + typeId;
    //     }

    //     if (categoryName) {
    //         params += params ? '&category_name=' : '?category_name=';
    //         params += categoryName;
    //     }

    //     return super.apiGet<ApiResult>(ApiConstants.CATEGORY_API + '/find' + params);
    // }

    public createCategory(name: string, typeId: string, categoryName: string) {
        let data = {
            "created_by": name,
            "type_id": typeId,
            "category_name": categoryName
        }
        return super.apiPost<ApiResult>(ApiConstants.CATEGORY_API, data);
    }

    public updateCategory(name: string, category: Category) {
        let data = {
            "type_id": category.type_id,
            "category_name": category.category_name,
            "updated_by": name
        };
        return super.apiPost<ApiResult>(ApiConstants.CATEGORY_API + '/update/' + category.id, data);
    }

    public deleteCategory(categoryId: number) {
        return super.apiPost<ApiResult>(ApiConstants.CATEGORY_API + '/delete/' + categoryId);
    }

}
