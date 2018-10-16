import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ApiResult } from '../models/api-result';
import { ApiConstants } from '../config/api-constants';
import { District } from '../models/base-setting/district';


@Injectable()
export class DistrictsService extends APIService {
  constructor(private http: HttpClient) {
    super(http);
  }

  public getDistricts(page: number = null) {
    let params = '';
    if (page) {
      params += `?page=${page}`;
    }
    return super.apiGet<ApiResult>(ApiConstants.ADMIN_API + '/districts' + params);
  }

  public searchDistricts(provinceId: string = null, districtName: string = null) {
    let params = '';
    if (provinceId) {
      params = "?province_id=" + provinceId;
    }
    if (districtName) {
      params += params ? '&district_name=' : '?district_name=';
      params += districtName;
    }
    console.log(districtName);
    console.log(params);
    return super.apiGet<ApiResult>(ApiConstants.DISTRICT_API + '/find' + params);
  }

  public getDistrict(id: number) {
    return super.apiGet<ApiResult>(ApiConstants.DISTRICT_API + '/details/' + id);

  }

  public createDistrict(name: string, province_id: string, districts: District[]) {
    console.log(districts)

    let data = {
      "created_by": name,
      "province_id": province_id,
      "data": districts
    };



    return super.apiPost<ApiResult>(ApiConstants.DISTRICT_API, data);
  }

  public updateDictrict(district: District) {
    let data = {
      "district_name": district.district_name,
      "province_id": district.province_id,
      "updated_by": district.created_by
    };
    return super.apiPost<ApiResult>(ApiConstants.DISTRICT_API + '/update/' + district.id, data);
  }

  public deleteDistrict(districtId: number) {
    return super.apiPost<ApiResult>(ApiConstants.DISTRICT_API + '/delete/' + districtId);
  }
}
