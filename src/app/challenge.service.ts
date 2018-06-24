import { Injectable } from '@angular/core';
import {CreateChallengeRequest} from './create.challenge.request';
import {Web3Service} from './web3.service';
import {CompleteChallengeRequest} from "./complete.challenge.request";

declare let require: any;
const fitbitChallengesArtifacts = require('../../build/contracts/FitbitChallenges.json');

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  accounts: string[];
  defaultGas: number;

  constructor(private challengeService: ChallengeService, private web3Service: Web3Service) {
    this.watchAccount();
    this.defaultGas = 3000000;

  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
    });
  }

  async createChallenge(request: CreateChallengeRequest): Promise<number> {
    const FitbitChallenges = await this.web3Service.artifactsToContract(fitbitChallengesArtifacts);
    const challenge = await FitbitChallenges.deployed();
    const challengeIndexResult = await challenge.
    poseChallenge(
      this.accounts[0],
      'Charity1',
      request.numberOfSteps,
      request.endDate.getTime(),
      request.value,
      {from: this.accounts[0], gas: this.defaultGas});
    const challengeIndex = challengeIndexResult.toNumber();

    // Accept the challenge immediately since we are running the app as the "company"
    await challenge.acceptChallenge(challengeIndex, {from: this.accounts[0], gas: this.defaultGas, value: request.value});

    return challengeIndex;

  }

  async completeChallenge(request: CompleteChallengeRequest) {
    const FitbitChallenges = await this.web3Service.artifactsToContract(fitbitChallengesArtifacts);
    const challenge = await FitbitChallenges.deployed();
    await challenge.fulfillChallenge(request.challengeIndex, request.numberOfSteps, {from: this.accounts[0], gas: this.defaultGas});
  }

}
