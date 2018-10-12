import { Injectable } from '@angular/core';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BehaviorSubject } from 'rxjs';
import { Session } from '../models/session/session';

@Injectable()
export class AuthenticateService {
    private sessionSource = new BehaviorSubject<Session>(null);
    public session$ = this.sessionSource.asObservable();
    redirectUrl: string;

    constructor() {
        let token = localStorage.getItem('token');
        if (token != null) {
            let name = localStorage.getItem('name');
            let id = localStorage.getItem('id');
            let email = localStorage.getItem('email');
            let session = new Session(token, id, name, email);
            this.setSession(session);
        }
    }

    setSession(session: Session) {
        //save data into local storage
        localStorage.setItem('token', session.token);
        localStorage.setItem('id', session.id);
        localStorage.setItem('name', session.name || '');
        localStorage.setItem('email', session.email || '');
        this.sessionSource.next(session);
    }

    clearSession() {
        localStorage.clear();
        this.sessionSource.next(null);
    }
}