import { Injectable } from '@angular/core';
import {CreateChallengeRequest} from './create.challenge.request';
import {Web3Service} from './web3.service';

declare let require: any;
const fitbitChallengesArtifacts = require('../../build/contracts/FitbitChallenges.json');

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  accounts: string[];

  constructor(private challengeService: ChallengeService, private web3Service: Web3Service) {
    this.watchAccount();

  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
    });
  }

  async createChallenge(request: CreateChallengeRequest) {
    const FitbitChallenges = await this.web3Service.artifactsToContract(fitbitChallengesArtifacts);
    console.log(FitbitChallenges);
    const challenge = await FitbitChallenges.deployed();
    const challengeIndexResult = await challenge.
    poseChallenge.call(this.accounts[0], 'for human rights', 1000, 1529781437, {from: this.accounts[0], gas: 300000});
    const challengeIndex = challengeIndexResult.toNumber();


  }

}
