import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../shared/services/authenticate.service';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { Session } from '../../shared/models/auth/session';
import { FormsModule } from '@angular/forms';
import { Login } from '../../shared/models/auth/login';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{

  loginVM: Login = new Login();
  session: Session;

  constructor(private authService: AuthenticateService, private router: Router, private alertService: AlertService) {
  }

  ngOnInit(){
    //redirect to homepage if user already logged in
    this.authService.session$.subscribe(
      data => {
        this.session = data;
        if (this.session && this.session.token != null) {
          this.router.navigate(['/']);
        }
      }
    );
  }

  login() {
    this.authService.login(this.loginVM.email, this.loginVM.password).subscribe(
      res => {
        if (res.token) {
          let token = res.token;
          this.session = new Session(token, this.loginVM.email, res.name);
          this.authService.setSession(this.session);
          let url = this.authService.redirectUrl ? this.authService.redirectUrl : '';
          this.authService.redirectUrl = null;
          this.router.navigate([url]);
        } 
      },
      err => {
        this.alertService.error("Wrong email or password! Please try again.",false)
      });
  }
}
