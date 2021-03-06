import { Injectable } from "@angular/core";
import { APIService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { ApiResult } from "../models/api-result";
import { ApiConstants } from "../config/api-constants";
import { Customer } from "../models/customer/customer";

@Injectable()
export class CustomersService extends APIService {
    constructor(private http: HttpClient) {
        super(http);
    }

    public searchCustomers(page: number = null, customer: Customer = null) {
        let params = '';

        if (page) {
            params += `?page=${page}`;
        }

        if (customer) {
            if (customer.name) {
                params += params ? '&name=' : '"?name="';
                params += customer.name;
            }
    
            if (customer.email) {
                params += params ? '&email=' : '"?email="';
                params += customer.email;
            }
    
            if (customer.phone) {
                params += params ? '&phone=' : '?phone=';
                params += customer.phone;
            }
    
            if (customer.is_active) {
                params += params ? '&is_active=' : '?is_active=';
                params += customer.is_active;
            }
    
            if (customer.login_type) {
                params += params ? '&login_type=' : '?login_type=';
                params += customer.login_type;
            }

            if (customer.is_reported) {
                params += params ? '&is_reported=' : '?is_reported=';
                params += customer.is_reported;
            }
        }

        return super.apiGet<ApiResult>(ApiConstants.CUSTOMER_API + '/find' + params);
    }

    public getCustomer(id: string) {
        return super.apiGet<ApiResult>(ApiConstants.CUSTOMER_API + '/details/' + id);
    }

    public activeCustomer(name: string, id: string) {
        let data = {
            "updated_by": name
        } 
        return super.apiPost<ApiResult>(ApiConstants.CUSTOMER_API + '/active-account/' + id, data);
    }

    public lockCustomer(name: string, id: string) {
        let data = {
            "updated_by": name
        } 
        return super.apiPost<ApiResult>(ApiConstants.CUSTOMER_API + '/locked-account/' + id, data);
    }
}