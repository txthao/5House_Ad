import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Session } from '../models/auth/session';
import { APIService } from './api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConstants } from '../config/api-constants';

@Injectable()
export class AuthenticateService extends APIService {
    private sessionSource = new BehaviorSubject<Session>(null);
    public session$ = this.sessionSource.asObservable();
    redirectUrl: string;

    constructor(private http: HttpClient) {
        super(http);
        let token = localStorage.getItem('token');
        if (token != null) {
            let email = localStorage.getItem('email');
            let name = localStorage.getItem('name');
            let session = new Session(token, email, name);
            this.setSession(session);
        }
    }

    setSession(session: Session) {
        //save data into local storage
        localStorage.setItem('token', session.token);
        localStorage.setItem('email', session.email || '');
        localStorage.setItem('name', session.name || '');
        this.sessionSource.next(session);
    }

    clearSession() {
        localStorage.clear();
        this.sessionSource.next(null);
    }

    public login(email: string, password: string) {
        let data = {
            "email": email,
            "password": password
        };
        return super.apiPost<any>(ApiConstants.ADMIN_API + '/login', data, null, false);
    }
}