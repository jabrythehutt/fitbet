import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';


@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.css']
})
export class CreateChallengeComponent implements OnInit {

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.authService.login();
    }
  }

}
