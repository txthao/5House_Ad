import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticateService } from './authenticate.service';
import { Session } from '../models/auth/session';
@Injectable()
export class AuthGuardService implements CanActivate {

    private session: Session;

    constructor(private authService: AuthenticateService, private router: Router) {
        this.authService.session$.subscribe(data => { this.session = data; });
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('token') != null) {
            return true;
        }
        this.authService.redirectUrl = state.url;
        this.router.navigate(['/login']);
        return false;

    }
}
