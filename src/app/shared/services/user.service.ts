import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConstants } from '../config/api-constants';


@Injectable()
export class UserService extends APIService {

  constructor(private http: HttpClient) {
    super(http);
  }

  public login(email: string, password: string) {
    let data = {
      "email": email,
      "password": password
    };
    return super.apiPost<any>('/login', data, null, false);
  }
}