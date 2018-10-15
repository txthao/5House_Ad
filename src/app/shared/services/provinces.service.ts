import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConstants } from '../config/api-constants';
import { ApiResult } from '../models/api-result';
import { Province } from '../models/base-setting/province';

@Injectable()
export class ProvincesService extends APIService {

    constructor(private http: HttpClient) {
        super(http);
    }

    public getProvinces(page: number = null) {
        let params = '';
        if (page) {
            params += `?page=${page}`;
        }
        return super.apiGet<ApiResult>(ApiConstants.ADMIN_API + '/provinces' + params);

    }

    public getProvince(id: number) {
        return super.apiGet<ApiResult>(ApiConstants.PROVINCE_API + '/details/' + id);

    }

    public createProvince(provinces: Province[]) {
        return super.apiPost<ApiResult>(ApiConstants.PROVINCE_API + '/create', provinces);
    }

    public updateProvince(province: Province) {
        let data = {
            "province_name": province.province_name,
            "updated_by": "ThaoTX"
        };
        return super.apiPost<ApiResult>(ApiConstants.PROVINCE_API + '/update/' + province.id, data);
    }

    public deleteProvince(provinceId: number) {
        return super.apiPost<ApiResult>(ApiConstants.PROVINCE_API + '/delete/' + provinceId);
    }

    public login() {
        let data = {
            "email": 'thao.pttg@gmail.com',
            "password": '123456'
        };
        return super.apiPost<any>('/api/login', data, null, false);
    }
}
