import { Component, Input } from '@angular/core';
import { navItems } from './../../_nav';
import { AuthenticateService } from '../../shared/services/authenticate.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  constructor(private authSerivce: AuthenticateService) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  logout(){
    this.authSerivce.clearSession();
  }
}
