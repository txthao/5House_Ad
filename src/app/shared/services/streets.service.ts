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

    public updateStreet(street: Street) {
        let data = {
            "street_name": street.street_name,
            "updated_by": street.updated_by
        };
        return super.apiPost<ApiResult>(ApiConstants.STREET_API + '/update/' + street.id, data);
    }

    public updateStreetWard(provinceId: string, districtId: string, wardId: string, street: Street) {
    
        wardId = wardId ? wardId : '';
        districtId = districtId ? districtId : '';
        street.district_id = street.district_id === 'undefined' ? '' : street.district_id;
        street.ward_id = street.ward_id === 'undefined' ? '' : street.ward_id;

        console.log(street.updated_by)

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
                "updated_by": street.updated_by
            }
        };

        return super.apiPost<ApiResult>('/api/admin/street_wards' + '/update/' + street.id, data);
    }

    public deleteStreet(name: string, streetIds: string[]) {
        let data = {
            "updated_by": name,
            "ids": streetIds
        };

        return super.apiPost<ApiResult>(ApiConstants.STREET_API + '/delete/', data);
    }

    deleteStreetWard(streetWards: Street[]) {

        let data = {
            "data": streetWards
        };

        return super.apiPost<ApiResult>('/api/admin/street_wards' + '/delete', data);
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
