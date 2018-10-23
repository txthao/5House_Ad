import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ApiResult } from '../models/api-result';
import { ApiConstants } from '../config/api-constants';
import { District } from '../models/base-setting/district';
import { Wards } from '../models/base-setting/wards';


@Injectable()
export class WardsService extends APIService {
  constructor(private http: HttpClient) {
    super(http);
  }

  public getWards(page: number = null) {
    let params = '';
    if (page) {
      params += `?page=${page}`;
    }
    return super.apiGet<ApiResult>(ApiConstants.ADMIN_API + '/wards' + params);
  }

  public searchWards(provinceId: string = null, districtId: string = null, wardName: string = null) {
    let params = '';

    if (provinceId) {
      params = "?province_id=" + provinceId;
    }

    if (districtId) {
        params += params ? '&district_id=' : '?district_id=';
        params = "?district_id=" + districtId;
      }

    if (wardName) {
      params += params ? '&district_name=' : '?district_name=';
      params += wardName;
    }

    console.log(wardName);
    console.log(params);
    return super.apiGet<ApiResult>(ApiConstants.DISTRICT_API + '/find' + params);
  }

  public getWard(id: number) {
    return super.apiGet<ApiResult>(ApiConstants.WARD_API + '/details/' + id);
  }

  public createWard(name: string, province_id: string, districts: District[]) {
    console.log(districts)

    let data = {
      "created_by": name,
      "province_id": province_id,
      "data": districts
    };

    return super.apiPost<ApiResult>(ApiConstants.DISTRICT_API, data);
  }

  public updateWard(ward: Wards) {
    let data = {
      "ward_name": ward.ward_name,
      "district_id": ward.district_id,
      "updated_by": ward.created_by
    };

    return super.apiPost<ApiResult>(ApiConstants.DISTRICT_API + '/update/' + ward.id, data);
  }

  public deleteWard(name: string, districtIds: number[]) {
    let data = {
      "updated_by": name,
      "ids": districtIds
    };

    return super.apiPost<ApiResult>(ApiConstants.DISTRICT_API + '/delete/', data);
  }
}