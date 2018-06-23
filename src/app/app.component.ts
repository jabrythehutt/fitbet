import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private authService: AuthService) {
    this.authService.handleAuthentication();
  }
  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.authService.login();
    }
  }
}
