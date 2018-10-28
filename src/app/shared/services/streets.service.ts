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

    public searchStreets(page: number = null, provinceId: string = null, districtId: string = null,
        wardId: string = null, streetName: string = null) {

        let params = '';

        if (page) {
            params += `?page=${page}`;
        }

        if (provinceId) {
            params += params ? '&province_id=' : '"?province_id="';
            params += provinceId;
        }

        if (districtId) {
            params += params ? '&district_id=' : '?district_id=';
            params += districtId;
        }

        if (wardId) {
            params += params ? '&ward_id=' : '?ward_id=';
            params += wardId;
        }

        if (streetName) {
            params += params ? '&street_name=' : '?street_name=';
            params += streetName;
        }

        return super.apiGet<ApiResult>(ApiConstants.STREET_API + '/find' + params);
    }

    public getStreet(streetId: string, provinceId: string, districtId: string, wardId: string) {
        let params = streetId;

        if (provinceId) {
            params += "?province_id=" + provinceId;
        }

        if (districtId) {
            params += params ? '&district_id=' : '?district_id=';
            params += districtId;
        }

        if (wardId) {
            params += params ? '&ward_id=' : '?ward_id=';
            params += wardId;
        }

        return super.apiGet<ApiResult>(ApiConstants.STREET_API + '/details/' + params);
    }

    public createStreet(name: string, streets: Street[]) {

        let data = {
            "created_by": name,
            "data": streets
        };

        return super.apiPost<ApiResult>(ApiConstants.STREET_API, data);
    }

    public updateStreetWard(provinceId: string, districtId: string, wardId: string, street: Street) {

        wardId = wardId ? wardId : '';
        districtId = districtId ? districtId : '';
        street.district_id = street.district_id ? street.district_id : '';
        street.ward_id = street.ward_id ? street.ward_id : '';

        let data = {
            "old": {
                "ward_id": wardId,
                "district_id": districtId,
                "province_id": provinceId
            },
            "new": {
                "ward_id": street.ward_id,
                "district_id": street.district_id,
                "province_id": street.province_id,
                "street_name": street.street_name,
                "created_by": street.created_by,
                "updated_by": street.updated_by
            }
        };

        return super.apiPost<ApiResult>('/api/admin/street_wards' + '/update/' + street.id, data);
    }

    deleteStreetWard(streetWards: Street[]) {

        let data = {
            "data": streetWards
        };

        return super.apiPost<ApiResult>('/api/admin/street_wards' + '/delete', data);
    }

    public addStreetToState(name: string = null, provincdId: string = null, DistrictId: string = null, wardId: string = null, streets: Street[]) {
        let data = {
            "created_by": name,
            "province_id": provincdId,
            "district_id": DistrictId,
            "ward_id": wardId,
            "streets": streets
        }

        return super.apiPost<ApiResult>('/api/admin/street_wards', data);
    }
}
