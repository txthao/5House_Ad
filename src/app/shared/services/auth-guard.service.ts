import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticateService } from './authenticate.service';
import { Session } from '../models/session/session';
@Injectable()
export class AuthGuardService implements CanActivate {
  
  private session: Session;

  constructor(private authService: AuthenticateService, private router: Router) {
      this.authService.session$.subscribe(data => { this.session = data; });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (this.session && this.session.token) { return true; }
      updateRedirectRoute(state);
      return false;
  }

}

function updateRedirectRoute(state: RouterStateSnapshot) {
  if (this.session) {
      this.router.navigate(['/']);
  } else {
      // Store the attempted URL for redirecting & navigate to login page
      this.authService.redirectUrl = state.url;
      this.router.navigate(['/users/signin']);
  }
}