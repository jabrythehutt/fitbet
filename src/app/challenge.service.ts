import { Injectable } from '@angular/core';
import {CreateChallengeRequest} from './create.challenge.request';
import {AuthService} from './auth.service';
import {Web3ServiceService} from './web3-service.service';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(private challengeService: ChallengeService, private web3Service: Web3ServiceService) {
  }

  async createChallenge(request: CreateChallengeRequest) {

  }

}
