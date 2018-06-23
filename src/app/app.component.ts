import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Fit Bet';
  constructor(private authService: AuthService) {
    this.authService.handleAuthentication();
  }

  ngOnInit(): void {
    setTimeout(() => {
      if (!this.authenticated) {
        this.authService.login();
      }
    }, 200);

  }

  signOut() {
    this.authService.logout();
  }

  get authenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
