import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ApiResult } from '../models/api-result';
import { ApiConstants } from '../config/api-constants';
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
        params += districtId;
      }

    if (wardName) {
      params += params ? '&ward_name=' : '?ward_name=';
      params += wardName;
    }

    return super.apiGet<ApiResult>(ApiConstants.WARD_API + '/find' + params);
  }

  public getWard(id: number) {
    return super.apiGet<ApiResult>(ApiConstants.WARD_API + '/details/' + id);
  }

  public createWard(name: string, district_id: string, wards: Wards[]) {

    let data = {
      "created_by": name,
      "district_id": district_id,
      "data": wards
    };

    return super.apiPost<ApiResult>(ApiConstants.WARD_API, data);
  }

  public updateWard(ward: Wards) {
    let data = {
      "ward_name": ward.ward_name,
      "district_id": ward.district_id,
      "updated_by": ward.created_by
    };

    return super.apiPost<ApiResult>(ApiConstants.WARD_API + '/update/' + ward.id, data);
  }

  public deleteWard(name: string, wardIds: number[]) {
    let data = {
      "updated_by": name,
      "ids": wardIds
    };

    return super.apiPost<ApiResult>(ApiConstants.WARD_API + '/delete/', data);
  }
}
