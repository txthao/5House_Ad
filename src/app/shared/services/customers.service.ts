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
        }

        return super.apiGet<ApiResult>(ApiConstants.CUSTOMER_API + '/find' + params);
    }

    public getCustomer(id: string) {
        return super.apiGet<ApiResult>(ApiConstants.CUSTOMER_API + '/' + id);
    }

    public activeCustomer(name: string, id: string) {
        let data = {
            "updated_by": name
        } 
        return super.apiPost<ApiResult>(ApiConstants.CUSTOMER_API + '/account_activation/' + id, data);
    }

    public lockCustomer(name: string, id: string) {
        let data = {
            "updated_by": name
        } 
        return super.apiPost<ApiResult>(ApiConstants.CUSTOMER_API + '/lock_account/' + id, data);
    }
}