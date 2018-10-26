import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { ApiResult } from '../models/api-result';
import { ApiConstants } from '../config/api-constants';
import { Street } from '../models/base-setting/street';
import { DistrictIndexComponent } from '../../views/base-setting/districts/district-index/district-index.component';


@Injectable()
export class StreetsService extends APIService {
    constructor(private http: HttpClient) {
        super(http);
    }

    public getStreets() {
        return super.apiGet<ApiResult>(ApiConstants.ADMIN_API + '/streets');
    }

    public searchStreets(provinceId: string = null, districtId: string = null,
        wardId: string = null, streetName: string = null) {

        let params = '';

        if (provinceId) {
            params = "?province_id=" + provinceId;
        }

        if (districtId) {
            params += params ? '&district_id=' : '?district_id=';
            params = "?district_id=" + districtId;
        }

        if (wardId) {
            params += params ? '&ward_id=' : '?ward_id=';
            params = "?ward_id=" + wardId;
        }

        if (streetName) {
            params += params ? '&street_name=' : '?street_name=';
            params += streetName;
        }

        return super.apiGet<ApiResult>(ApiConstants.STREET_API + '/find' + params);
    }

    public getStreet(id: number) {
        return super.apiGet<ApiResult>(ApiConstants.STREET_API + '/details/' + id);
    }

    public createStreet(name: string, streets: Street[]) {

        let data = {
            "created_by": name,
            "data": streets
          };

        return super.apiPost<ApiResult>(ApiConstants.STREET_API, data);
    }

    public updateStreet(street: Street) {
        let data = {
            "ward_id": street.ward_id,
            "district_id": street.district_id,
            "province_id": street.province_id,
            "updated_by": street.created_by
        };

        return super.apiPost<ApiResult>(ApiConstants.WARD_API + '/update/' + street.id, data);
    }

    public deleteStreet(name: string, streetIds: number[]) {
        let data = {
            "updated_by": name,
            "ids": streetIds
        };

        return super.apiPost<ApiResult>(ApiConstants.STREET_API + '/delete/', data);
    }

    public addStreetToState(name: string = null, provincdId: string = null, DistrictId: string = null, wardId: string = null, streets: Street[]) {
        let data = {
            "create_by": name,
            "province_id": provincdId,
            "district_id": DistrictId,
            "ward_id": wardId,
            "ids": streets
        }

        return super.apiPost<ApiResult>('/api/admin/street_wards', data);
    }
}
