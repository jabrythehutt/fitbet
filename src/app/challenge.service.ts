import { Injectable } from '@angular/core';
import {CreateChallengeRequest} from './create.challenge.request';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(private authService: AuthService) {
  }

  async createChallenge(request: CreateChallengeRequest) {

  }

}
