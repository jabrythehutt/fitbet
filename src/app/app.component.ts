import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FitBet';
  constructor(private authService: AuthService) {
    this.authService.handleAuthentication();
  }

  ngOnInit(): void {
    if (!this.authenticated) {
      this.authService.login();
    }
  }

  get authenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
